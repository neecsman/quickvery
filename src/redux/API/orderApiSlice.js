import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    calcOrder: builder.mutation({
      query: (body) => ({
        url: "/orders/calc",
        method: "POST",
        body,
      }),
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders/create",
        method: "POST",
        body,
      }),
    }),
    cancelOrder: builder.mutation({
      query: (body) => ({
        url: "/orders/cancel",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useCreateOrderMutation,
  useCalcOrderMutation,
  useCancelOrderMutation,
} = orderApiSlice;
