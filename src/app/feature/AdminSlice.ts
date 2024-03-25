/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiAdmin = createApi({
  reducerPath: "apiadmin",
  tagTypes: ["admin"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/admin",
  }),
  endpoints: (build) => ({
    fetchAdmin: build.query({
      query: () => "/show",
      providesTags: (result) =>
        result
          ? [
              ...result.Admins.data.map(({ id }: string | any)  => ({
                type: "admin",
                id,
              })),
              "admin",
            ]
          : ["admin"],
    }),
    addAdmin: build.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["admin"],
    }),
    updateAdmin: build.mutation({
      query: (formData) => ({
        url: `/update/${formData.id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["admin"],
    }),
    delAdmin: build.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useFetchAdminQuery,
  useAddAdminMutation,
  useDelAdminMutation,
  useUpdateAdminMutation,
} = ApiAdmin;
