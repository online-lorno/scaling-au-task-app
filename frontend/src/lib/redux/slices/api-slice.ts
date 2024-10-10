import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateTaskParams, Task, UpdateTaskParams } from "@/lib/types";
import { getTokenAction } from "@/app/(pages)/login/actions";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
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
      // // optimistic update
      // onQueryStarted: async ({ title }, { dispatch, queryFulfilled }) => {
      //   const patchResult = dispatch(
      //     apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
      //       draft.push({
      //         id: -1,
      //         title,
      //         isCompleted: false,
      //         createdAt: new Date(),
      //         userId: -1,
      //       });
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
    updateTask: builder.mutation<
      Task,
      { id: number; params: UpdateTaskParams }
    >({
      query: ({ id, params }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: params,
      }),
      // // optimistic update
      // onQueryStarted: async ({ id, params }, { dispatch, queryFulfilled }) => {
      //   const patchResult = dispatch(
      //     apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
      //       const task = draft.find((task) => task.id === id);
      //       if (task) {
      //         if (params.title !== undefined) task.title = params.title;
      //         if (params.isCompleted !== undefined)
      //           task.isCompleted = params.isCompleted;
      //       }
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
    deleteTask: builder.mutation<Task, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      // // optimistic update
      // onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
      //   const patchResult = dispatch(
      //     apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
      //       draft.filter((task) => task.id !== id);
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
