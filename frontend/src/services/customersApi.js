import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swacchh.com/backend/api/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      // Add JWT token from localStorage
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "customers",
      providesTags: ["Customer"],
    }),
    addCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: "customers",
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `customers/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
