import { apiSlice } from "../api/apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClient: builder.query({
      query: () => ({
        url: "/client/all",
        method: "GET",
      }),
      providesTags: ["client"],
    }),

    addClient: builder.mutation({
      query: (data) => ({
        url: "/client/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["client"],
    }),

    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/client/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["client"],
    }),
  }),
});

export const {
  useGetAllClientQuery,
  useAddClientMutation,
  useDeleteClientMutation,
} = clientApi;