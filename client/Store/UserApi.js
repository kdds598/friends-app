import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = "http://localhost:3000/api/users";
const BASE_URL = import.meta.env.VITE_Backend_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint !== 'signUp' && endpoint !== 'login') {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ['user', 'rreq', 'sreq', 'fr'],

  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (newUser) => ({
        url: '/signup',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [], // No invalidation necessary for sign up
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [], // No invalidation necessary for login
    }),
    fetchUsers: builder.query({
      query: () => '/users',
      providesTags: ['user'],
    }),
    sendFriendRequest: builder.mutation({
      query: (recipientId) => ({
        url: `/friend-request`,
        method: 'POST',
        body: { recipientId },
      }),
      invalidatesTags: ['user', 'sreq'],
    }),
    acceptRequest: builder.mutation({
      query: (reqbody) => ({
        url: `/accept-friend-request`,
        method: 'POST',
        body: reqbody,
      }),
      invalidatesTags: ['fr', 'rreq'],
    }),
    rejectRequest: builder.mutation({
      query: (reqbody) => ({
        url: `/reject-friend-request`,
        method: 'POST',
        body: reqbody,
      }),
      invalidatesTags: ['rreq'],
    }),
    fetchself: builder.query({
      query: () => ({
        url: `/me`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    fetchselfRecievedFr: builder.query({
      query: () => ({
        url: `/me/recievedfrreq`,
        method: 'GET',
      }),
      providesTags: ['rreq'],
    }),
    fetchselFriends: builder.query({
      query: () => ({
        url: `/me/getfriends`,
        method: 'GET',
      }),
      providesTags: ['fr'],
    }),
    fetchselfsentFr: builder.query({
      query: () => ({
        url: `/me/sentfrreq`,
        method: 'GET',
      }),
      providesTags: ['sreq'],
    }),
    getRecommendedUsers: builder.query({
      query: () => `/getRecommendation`,
      providesTags: ['user'], // Assumed relevant tag
    }),
    searchUsers: builder.query({
      query: (searchTerm) => `/search?search=${encodeURIComponent(searchTerm)}`,
      providesTags: ['user'], // Assumed relevant tag
    }),
    unfriendUser: builder.mutation({
      query: (friendId) => ({
        url: '/unfriend',
        method: 'POST',
        body: { friendId },
      }),
      invalidatesTags: ['fr'], // Assumed relevant tag for friends
    }),
  }),
});

export const {
  useGetRecommendedUsersQuery,
  useUnfriendUserMutation,
  useSearchUsersQuery,
  useFetchselFriendsQuery,
  useFetchselfRecievedFrQuery,
  useFetchselfsentFrQuery,
  useSignUpMutation,
  useLoginMutation,
  useFetchUsersQuery,
  useSendFriendRequestMutation,
  useAcceptRequestMutation,
  useRejectRequestMutation,
  useFetchselfQuery,
} = userApi;
