import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",   // ✅ keep this
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/register",   // ✅ THIS LINE
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = apiService;
