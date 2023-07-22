import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Vehicle } from "../types/apiTypes";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rails-ticket-server-d195e679f8ce.herokuapp.com/api/v1/",
  }),
  endpoints: (builder) => ({
    getVehicles: builder.query<Vehicle[], void>({
      query: () => ({ url: "/vehicles" }),
    }),
  }),
});

export const { useGetVehiclesQuery } = api;
