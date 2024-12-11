import { apiSlice } from "../api/apiSlice";

export const featureProjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureProjects: builder.query({
      query: () => ({
        url: "/featureProject",
      }),
      providesTags: ["FeatureProjects"],
    }),

    getFeatureProjectById: builder.query({
      query: (id) => ({
        url: `/featureProject/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "FeatureProjects", id }],
    }),

    createFeatureProject: builder.mutation({
      query: (formData) => ({
        url: `/featureProject/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["FeatureProjects"],
    }),

    updateFeatureProject: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/featureProject/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "FeatureProjects", id }],
    }),

    deleteFeatureProject: builder.mutation({
      query: (id) => ({
        url: `/featureProject/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FeatureProjects"],
    }),
  }),
});

export const {
  useGetFeatureProjectsQuery,
  useGetFeatureProjectByIdQuery,
  useCreateFeatureProjectMutation,
  useUpdateFeatureProjectMutation,
  useDeleteFeatureProjectMutation,
} = featureProjectApi;