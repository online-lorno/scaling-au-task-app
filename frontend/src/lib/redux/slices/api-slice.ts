import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateTaskParams, Task } from "@/lib/types";
import { getTokenAction } from "@/app/(pages)/login/actions";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: async (headers) => {
      const { token } = await getTokenAction(); // get token from server-side action
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], undefined>({
      query: () => "/tasks",
    }),
    addTask: builder.mutation<Task, CreateTaskParams>({
      query: (params) => ({
        url: "/tasks",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = apiSlice;
