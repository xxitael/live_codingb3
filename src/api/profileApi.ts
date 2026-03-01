import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseApi";

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  exp: number;
}

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProfile: builder.query<{ user: JwtPayload }, void>({
      query: () => "/profile",
    }),
  }),
});

export const { useLazyGetProfileQuery } = profileApi;