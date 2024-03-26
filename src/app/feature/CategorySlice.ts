/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiCategory = createApi({
  reducerPath: "api",
  tagTypes: ["category"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/admin/category",
  }),
  endpoints: (build) => ({
    fetchCategory: build.query({
      query: (page) => `/show?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.Categories.data.map(({ id }: string | any) => ({
                type: "category",
                id,
              })),
              "category",
            ]
          : ["category"],
    }),
    addCategory: build.mutation({
      query: (data) => ({
        url: "/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (arg) => [{ type: "category", id: arg.id }],
    }),
    updateCategory: build.mutation({
      query: (data) => ({
        url: `/update/${data.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (arg) => [{ type: "category", id: arg.id }],
    }),
    delCategory: build.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: (arg) => [{ type: "category", id: arg.id }],
    }),
  }),
});

export const {
  useFetchCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDelCategoryMutation,
} = ApiCategory;
