import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leadsApi = createApi({
  reducerPath: "leadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Leads"],
  endpoints: (builder) => ({
    // Get all leads
    getAllLeads: builder.query({
      query: () => "/leads",
      providesTags: ["Leads"],
    }),

    // Add new lead
    addLead: builder.mutation({
      query: (newLead) => ({
        url: "/leads",
        method: "POST",
        body: newLead,
      }),
      invalidatesTags: ["Leads"],
    }),
  }),
});

// Export hooks for usage in components
export const { useGetAllLeadsQuery, useAddLeadMutation } = leadsApi;
