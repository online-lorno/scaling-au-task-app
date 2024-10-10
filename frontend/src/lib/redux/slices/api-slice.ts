import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "@/lib/types";

const getTokenFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers) => {
      const token = getTokenFromCookies(); // Get token from cookies
      console.log("apiSlice", { token });
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], undefined>({
      query: () => "/tasks",
    }),
  }),
});

export const { useGetTasksQuery } = apiSlice;
