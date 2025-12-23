import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swacchh.com/backend/api/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "orders",
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: ["Orders"],
    }),
    getMyOrders: builder.query({
      query: () => "orders/my-orders",
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation({
      query: (newOrder) => ({
        url: "orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...order }) => ({
        url: `orders/${id}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
//     updateTracking: builder.mutation({
//   query: ({ id, trackingId }) => ({
//     url: `orders/${id}/tracking`,
//     method: "PUT",
//     body: { trackingId }, // only send trackingId now
//   }),
//   invalidatesTags: ["Orders"],
// }),
updateTracking: builder.mutation({
  query: ({ id, trackingId, trackingUrl }) => ({
    url: `orders/${id}/tracking`,
    method: "PUT",
    body: { trackingId, trackingUrl }, // Send both
  }),
  invalidatesTags: ["Orders"],
}),

  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useUpdateTrackingMutation, // ✅ added
} = ordersApi;
