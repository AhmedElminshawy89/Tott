/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiCity = createApi({
  reducerPath: "apicity",
  tagTypes: ["city"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/admin/city",
  }),
  endpoints: (build) => ({
    fetchCity: build.query<any, number>({
      query: (page) => `/show?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.Cities.data.map(({ id }: { id: string }) => ({
                type: "city",
                id,
              })),
              "city",
            ]
          : ["city"],
    }),
    addCity: build.mutation<any, FormData>({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["city"],
    }),
    updateCity: build.mutation<any, FormData>({
      query: (updateCityData) => ({
        url: `/update/${updateCityData.get("id")}`,
        method: "POST",
        body: updateCityData,
      }),
      invalidatesTags: ["city"],
    }),
    delCity: build.mutation<any, string>({
      query: (id) => ({
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
