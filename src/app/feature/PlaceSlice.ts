/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ApiPlace = createApi({
  reducerPath: "apiplace",
  tagTypes: ["place"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/admin/place",
  }),
  endpoints: (build) => ({
    fetchPlace: build.query({
      query: (page = 1) => `/show?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.Places.data.map(({ id }: string | any) => ({
                type: "place",
                id,
              })),
              "place",
            ]
          : ["place"],
    }),
    addPlace: build.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["place"],
    }),
    updatePlace: build.mutation({
      query: (formData) => ({
        url: `/update/${formData.id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["place"],
    }),
    delPlace: build.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["place"],
    }),
  }),
});

export const {
  useFetchPlaceQuery,
  useAddPlaceMutation,
  useUpdatePlaceMutation,
  useDelPlaceMutation,
} = ApiPlace;
