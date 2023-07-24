import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateUser,
  CreateUserVehicle,
  User,
  Vehicle,
} from "../types/apiTypes";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rails-ticket-server-d195e679f8ce.herokuapp.com/api/v1/",
  }),
  tagTypes: ["User", "Vehicles"],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (firebaseUserId) => ({ url: `/users/${firebaseUserId}` }),
      providesTags: ["User"]
    }),
    createUser: builder.mutation<User, CreateUser>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    getUserVehicles: builder.query<Vehicle[], string>({
      query: (firebaseUserId) => ({ url: `/users/${firebaseUserId}/vehicles` }),
      providesTags: ["Vehicles"]
    }),
    createUserVehicle: builder.mutation<
      User,
      { firebaseUserId: string; data: CreateUserVehicle }
    >({
      query: ({ firebaseUserId, data }) => ({
        url: `/users/${firebaseUserId}/vehicles`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vehicles"]
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useCreateUserMutation,
  useGetUserVehiclesQuery,
  useCreateUserVehicleMutation,
} = api;
