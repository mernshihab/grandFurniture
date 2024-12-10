import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch Featured Products
    getFeaturedProducts: builder.query({
      query: (query) => ({
        url: `/product/featured-products`,
        method: "GET",
        params: query,
      }),
      providesTags: ["product", "featured"],
    }),

    // Fetch All Products with Pagination, Filtering, Sorting
    getAllProducts: builder.query({
      query: (query) => ({
        url: `/product/all-products`,
        method: "GET",
        params: query,
      }),
      providesTags: ["product"],
    }),

    // Fetch Product by ID
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    // Fetch Product by Slug
    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/product/getbyslug/${slug}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    // Add a New Product (with File Upload)
    addProduct: builder.mutation({
      query: (formData) => ({
        url: `/product/add-product`,
        method: "POST",
        body: formData, // FormData for file uploads
      }),
      invalidatesTags: ["product"],
    }),

    // Update Product (with File Upload)
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        body: formData, // FormData for file uploads
      }),
      invalidatesTags: ["product"],
    }),

    // Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    // Toggle Product Featured Status
    updateFeatured: builder.mutation({
      query: (id) => ({
        url: `/product/update/feature/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["product", "featured"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateFeaturedMutation,
} = productApi;
