import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { generateLocalToken } from "../localAuth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),

  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn({ username, password }) {
        if (!username || !password) {
          return { error: { status: 401, message: "Invalid credentials" } };
        }

        const token = generateLocalToken(username);

        return { data: { accessToken: token } };
      },

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            localStorage.setItem("access_token", data.accessToken);
          }
        } catch {}
      },
    }),

    logout: builder.mutation({
      async queryFn() {
        localStorage.removeItem("access_token");
        return { data: true };
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;