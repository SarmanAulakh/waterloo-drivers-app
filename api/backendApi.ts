import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateUser,
  CreateUserVehicle,
  Ticket,
  User,
  Vehicle,
  MapMarkers
} from "../types/apiTypes";
import { emptySplitApi } from ".";

const BASE_URL = "https://rails-ticket-server-d195e679f8ce.herokuapp.com/api/v1"

export const api = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (firebaseUserId) => ({ url: `${BASE_URL}/users/${firebaseUserId}` }),
      providesTags: ["User"]
    }),
    createUser: builder.mutation<User, CreateUser>({
      query: (data) => ({
        url: `${BASE_URL}/users`,
        method: "POST",
        body: data,
      }),
    }),
    getUserVehicles: builder.query<Vehicle[], string>({
      query: (firebaseUserId) => ({ url: `${BASE_URL}/users/${firebaseUserId}/vehicles` }),
      providesTags: ["Vehicles"]
    }),
    createUserVehicle: builder.mutation<
      User,
      { firebaseUserId: string; data: CreateUserVehicle }
    >({
      query: ({ firebaseUserId, data }) => ({
        url: `${BASE_URL}/users/${firebaseUserId}/vehicles`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vehicles"]
    }),
    getUserTickets: builder.query<Ticket[], string>({
      query: (firebaseUserId) => ({ url: `${BASE_URL}/users/${firebaseUserId}/tickets` }),
    }),
    getMapMarkers: builder.query<MapMarkers[], null>({
      query: () => ({ url: `${BASE_URL}/map_markers` }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useCreateUserMutation,
  useGetUserVehiclesQuery,
  useCreateUserVehicleMutation,
  useGetUserTicketsQuery,
  useGetMapMarkersQuery
} = api;
