// src/services/couponsApi.js
import { apiService } from "./apiService";

export const couponsApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all coupons
    getCoupons: builder.query({
      query: () => ({
        url: "coupons",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Coupons"],
    }),

    // ✅ Add coupon
    addCoupon: builder.mutation({
      query: (newCoupon) => ({
        url: "coupons",
        method: "POST",
        body: newCoupon,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Coupons"],
    }),

    // ✅ Update coupon
    updateCoupon: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `coupons/${id}`,
        method: "PUT",
        body: updatedData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Coupons"],
    }),

    // ✅ Delete coupon
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `coupons/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
