/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiUser = createApi({
  reducerPath: "apiuser",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api",
  }),
  endpoints: (build) => ({
    fetchUser: build.query({
      query: (page) => `/showUser?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.Users.data.map(({ id }: string | any)  => ({
                type: "user",
                id,
              })),
              "user",
            ]
          : ["user"],
    }),
    addUser: build.mutation({
      query: (formData) => ({
        url: "/registerUser",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: build.mutation({
      query: (formData) => ({
        url: `/updateUser/${formData.get("id")}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
    delUser: build.mutation({
      query: (id: string) => ({
        url: `/deleteUser/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useFetchUserQuery,
  useAddUserMutation,
  useDelUserMutation,
  useUpdateUserMutation,
} = ApiUser;
