import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateUser, User, Vehicle } from "../types/apiTypes";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rails-ticket-server-d195e679f8ce.herokuapp.com/api/v1/",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (firebaseUserId) => ({ url: `/users/${firebaseUserId}` }),
    }),
    createUser: builder.mutation<User, CreateUser>({
      query: (data) => ({ 
        url: "/users",
        method: "POST",
        body: data
      }),
    }),
    getVehicles: builder.query<Vehicle[], void>({
      query: () => ({ url: "/vehicles" }),
    }),
  }),
});

export const { 
  useGetUserQuery,
  useLazyGetUserQuery,
  useCreateUserMutation,
  useGetVehiclesQuery
} = api;
