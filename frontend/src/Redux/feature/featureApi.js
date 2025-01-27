import { apiSlice } from "../api/apiSlice";

export const featureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatures: builder.query({
      query: () => ({
        url: "/feature",
      }),
      providesTags: ["Features"],
    }),

    getFeatureById: builder.query({
      query: (id) => ({
        url: `/feature/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Features", id }],
    }),

    createFeature: builder.mutation({
      query: (formData) => ({
        url: `/feature/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Features"],
    }),

    updateFeature: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/feature/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Features", id }],
    }),

    deleteFeature: builder.mutation({
      query: (id) => ({
        url: `/feature/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Features"],
    }),
  }),
});

export const {
  useGetFeaturesQuery,
  useGetFeatureByIdQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featureApi;