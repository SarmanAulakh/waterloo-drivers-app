import { emptySplitApi } from ".";
import { CarModel } from "../types/externalApiTypes";

const BASE_URL = "https://parseapi.back4app.com"
const HEADERS = {
  "X-Parse-Application-Id": "hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z",
  "X-Parse-Master-Key": "SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW",
}

export const carModelApi = emptySplitApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllCarModels: builder.query<{ results: CarModel[] }, { skip: number; limit: number }>({
      query: ({ skip, limit }) => ({
        url: `${BASE_URL}/classes/Car_Model_List?skip=${skip}&limit=${limit}`,
        headers: HEADERS
      }),
    }),
  }),
});

export const {
  useGetAllCarModelsQuery
} = carModelApi;
