import { apiSlice } from "./apiSlice";

export const mailAPiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendFeedbackMail: builder.mutation({
      query: (body) => ({
        url: "/mail/feedback",
        method: "POST",
        body,
      }),
    }),
    sendOrderMail: builder.mutation({
      query: (body) => ({
        url: "/mail/order",
        method: "POST",
        body,
      }),
    }),
    sendCandidateMail: builder.mutation({
      query: (body) => ({
        url: "/mail/candidate",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSendFeedbackMailMutation,
  useSendOrderMailMutation,
  useSendCandidateMailMutation,
} = mailAPiSlice;
