import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    registration: builder.mutation({
      query: (body) => ({
        url: "/user/registration",
        method: "POST",
        body,
      }),
    }),
    checkAuth: builder.query({
      query: () => ({
        url: "/user/refresh",
      }),
    }),
    update: builder.mutation({
      query: (body) => ({
        url: "/user/update",
        method: "POST",
        body,
      }),
    }),
    recovery: builder.mutation({
      query: (body) => ({
        url: "/user/recovery",
        method: "POST",
        body,
      }),
    }),

    activate: builder.mutation({
      query: (body) => ({
        url: "/user/activate",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
  useCheckAuthQuery,
  useLazyCheckAuthQuery,
  useUpdateMutation,
  useRecoveryMutation,
  useActivateMutation,
} = authApiSlice;
