import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Função para determinar a URL base com base no ambiente
const getBaseUrl = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:5000/api/comments";
  } else {
    return "https://popcinereviews-bgasg2ajd2c0btgk.westeurope-01.azurewebsites.net/api/comments"; // substitua com sua URL real do Azure
  }
};

const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: "include",
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: (commentData) => ({
        url: "/post-comment",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Comments', id: postId }],
    }),
    getComments: builder.query({
      query: () => ({
        url: "/total-comments",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCommentsQuery, usePostCommentMutation } = commentApi;
export default commentApi;
