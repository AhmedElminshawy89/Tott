/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiCity = createApi({
  reducerPath: "apicity",
  tagTypes: ["city"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/admin/city",
  }),
  endpoints: (build) => ({
    fetchCity: build.query({
      query: (page = 1) => `/show?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.Cities.data.map(({ id }: string | any)  => ({
                type: "city",
                id,
              })),
              "city",
            ]
          : ["city"],
    }),
    addCity: build.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["city"],
    }),
    updateCity: build.mutation({
      query: (formData) => ({
        url: `/update/${formData.id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["city"],
    }),
    delCity: build.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["city"],
    }),
  }),
});

export const {
  useFetchCityQuery,
  useAddCityMutation,
  useUpdateCityMutation,
  useDelCityMutation,
} = ApiCity;
