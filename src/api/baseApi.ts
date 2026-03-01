import { fetchBaseQuery, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { Mutex } from "async-mutex";

interface JwtPayload {
  exp: number;
}

function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const mutex = new Mutex();

const baseQueryWithReauth = async (args: string | FetchArgs, api: any, extraOptions: any) => {
  if (mutex.isLocked()) await mutex.waitForUnlock();

  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (isTokenExpired(accessToken)) {
    if (!refreshToken) {
      localStorage.removeItem("access_token");
      return { error: { status: 401, data: { message: "No refresh token" } } };
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { accessToken: newToken } = refreshResult.data as any;
          localStorage.setItem("access_token", newToken);
          accessToken = newToken;
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          return refreshResult;
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      accessToken = localStorage.getItem("access_token");
    }
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  return result;
};

export default baseQueryWithReauth;