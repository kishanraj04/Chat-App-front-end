import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/" }),
  tagTypes: ["chat", "user", "friendreq","msg"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    myChat: builder.query({
      query: () => ({
        url: "/chat/my-chats",
        credentials: "include",
      }),
      providesTags: ["chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `user/search/user?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["user"],
    }),
    sendFrRequest: builder.mutation({
      query: (id) => ({
        url: `user/sendrequest`,
        credentials: "include",
        method: "PUT",
        body: { userId: id },
      }),
      invalidatesTags: ["friendreq"],
    }),
    allRequest: builder.query({
      query: () => ({
        url: "user/all-request",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["friendreq"],
    }),
    getFirendRequest: builder.mutation({
      query: ({ requestId, accept }) => ({
        url: "user/acceptrequest",
        method: "PUT",
        body: { requestId, accept },
        credentials: "include",
      }),
      invalidatesTags: ["friendreq"],
      keepUnusedDataFor: 0,
    }),
    getYourRequestNotification: builder.query({
      query: () => ({
        url: "user/notifications",
        credentials: "include",
        method: "GET",
      }),
      providesTags: ["friendreq"],
    }),
    newUser: builder.mutation({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    deleteRequest: builder.mutation({
      query: (data) => ({
        url: "user/remove/request",
        method: "DELETE",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["friendreq"],
    }),
    getMyChats: builder.query({
      query: () => ({
        url: "chat/my-chats",
        credentials: "include",
        method: "GET",
      }),
    }),
    getChatMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        method: "GET",
        credentials: "include",
      }),
    }),
     sendAttachments: builder.mutation({
      query: (data) => ({
        url: `chat/message`,
        credentials: "include",
        method: "POST",
        body:data,
      }),
      invalidatesTags:["msg"]
    }),
  }),
});

export default api;
export const {
  useMyChatQuery,
  useLazySearchUserQuery,
  useShowFriendRequestQuery,
  useSendFrRequestMutation,
  useAllRequestQuery,
  useGetFirendRequestMutation,
  useGetYourRequestNotificationQuery,
  useNewUserMutation,
  useLoginUserMutation,
  useDeleteRequestMutation,
  useGetMyChatsQuery,
  useGetChatMessagesQuery,
  useSendAttachmentsMutation
} = api;
