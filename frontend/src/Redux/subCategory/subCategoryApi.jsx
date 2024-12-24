import { apiSlice } from "../api/apiSlice";

export const subCategoryApi = apiSlice.injectEndpoints({
  tagTypes: ["sub_category"],
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: () => ({
        url: "/subCategory/all",
      }),
      providesTags: ["sub_category"],
    }),

    getSubCategory: builder.query({
      query: (id) => ({
        url: `/subCategory/${id}`,
      }),
    }),

    addSubCategory: builder.mutation({
      query: (formData) => ({
        url: `/subCategory/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["sub_category"],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Add subcategory failed:", error);
        }
      },
    }),

    updateSubCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/subCategory/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["sub_category"],
    }),

    deleteSubCategory: builder.mutation({
      query: ({ id, categoryId }) => ({
        url: `/subCategory/delete/${id}`,
        method: "DELETE",
        body: { categoryId },
      }),
      invalidatesTags: ["sub_category"],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoryQuery,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
