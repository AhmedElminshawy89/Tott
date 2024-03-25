/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiReview = createApi({
  reducerPath: "apireview",
  tagTypes: ["review"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/admin/rating",
  }),
  endpoints: (build) => ({
    fetchReview: build.query({
      query: (page = 1) => `/show?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.Rating.data.map(({ id }: string | any)  => ({
                type: "review",
                id,
              })),
              "review",
            ]
          : ["review"],
    }),
    addReview: build.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: build.mutation({
      query: (formData) => ({
        url: `/update/${formData.id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["review"],
    }),
    delReview: build.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useFetchReviewQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDelReviewMutation,
} = ApiReview;
