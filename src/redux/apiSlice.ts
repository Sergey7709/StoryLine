import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../common/constants';
import {
  BodyFetchUserRequest,
  BodyRegisterUserRequest,
  BodyUpdateUserRequest,
} from '../api/authApi';
import { RootState } from './store';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['items', 'user'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: '',
    },
    prepareHeaders: async (headers, { getState }) => {
      const data = (await getState()) as RootState;
      if (data.api.mutations) {
        headers.set('Authorization', '');
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (param) => 'item/' + param,
      providesTags: ['items'],
    }),
    getCurrentUser: builder.query({
      query: () => 'user/current',
      providesTags: ['user'],
    }),
    login: builder.mutation({
      query: (body: BodyFetchUserRequest) => ({
        method: 'POST',
        url: 'user/login',
        body,
      }),
    }),
    register: builder.mutation({
      query: (body: BodyRegisterUserRequest) => ({
        method: 'POST',
        url: 'user/register',
        body,
      }),
    }),
    updateProfile: builder.mutation({
      query: (body: BodyUpdateUserRequest) => ({
        method: 'PUT',
        url: 'user/update',
        body,
      }),
    }),
  }),
});
export const {
  useGetItemsQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} = apiSlice;
