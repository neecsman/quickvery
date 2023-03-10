import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, setLogout } from "../authSlice";

const baseQuery = fetchBaseQuery({
  mode: "cors",
  baseUrl: "https://quickvery.ru/api",
  // baseUrl: "http://localhost:8080/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOtions) => {
  let result = await baseQuery(args, api, extraOtions);

  if (result?.error?.originalStatus === 401) {
    const refreshResult = await baseQuery("/user/refresh", api, extraOtions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOtions);
    } else {
      api.dispatch(setLogout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
