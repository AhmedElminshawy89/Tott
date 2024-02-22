import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "80c4f1e231bd07dee137ff5dec1217ca";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  tagTypes: ["weatherApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5",
  }),
  endpoints: (builder) => ({
    getWeatherData: builder.query({
      query: (city) => `weather?q=${city} &units=Metric&appid=${apiKey}`,
    }),
  }),
});

export const { useGetWeatherDataQuery } = weatherApi;
