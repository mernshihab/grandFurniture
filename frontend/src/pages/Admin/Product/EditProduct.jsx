import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import JoditEditor from "jodit-react";
import ImageUploading from "react-images-uploading";
import "react-tagsinput/react-tagsinput.css";
import { toast } from "react-toastify";
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "../../../Redux/category/categoryApi";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../Redux/product/productApi";

import { useGetSubCategoryQuery } from "../../../Redux/subCategory/subCategoryApi";
import { useAllBrandsQuery } from "../../../Redux/brand/brandApi";

export default function EditProduct() {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [variantEnabled, setVariantEnabled] = useState(false);
  const [variants, setVariants] = useState([]);

  const { data, isLoading: pLoading } = useGetProductByIdQuery(id);
  const product = data?.data;

  console.log(product);

  const { data: categories } = useGetCategoriesQuery();
  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: subCategory } = useGetSubCategoryQuery(subCategoryId);
  const { data: brands } = useAllBrandsQuery();


  const subCategories = category?.data?.subCategories;
  const subSubCategories = subCategory?.data?.subSubCategories;

  useEffect(() => {
    if (product) {
      setTitle(product?.title);
      setDetails(product?.description);
      setThumbnail([{ data_url: product?.thumbnail }]);
      setCategoryId(product?.category?._id);
      setSubCategoryId(product?.subCategory?._id);
      setSubSubCategoryId(product?.subSubCategory?._id);
      setBrand(product?.brand);
      setSellingPrice(product?.sellingPrice);
      setPurchasePrice(product?.purchasePrice);
      setStock(product?.totalStock);
      setDiscount(product?.discount);
      setFeatured(product?.featured);
      setVariants(product?.variants);
    }
  }, [product]);

  


  const handleImageChange = (imageList, index) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index ? { ...variant, image: imageList[0] } : variant,
      ),
    );
  };


  const handleVariantChange = (e, index, field) => {
    const value = e.target.value;
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant,
      ),
    );
  };

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // Edit product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!thumbnail.length) return toast.warning("Thumbnail is required");
    if (!title) return toast.warning("Title is required");
    if (!categoryId) return toast.warning("Category is required");
    if (!sellingPrice) return toast.warning("Selling Price is required");
    if (!purchasePrice) return toast.warning("Purchase Price is required");
    if (!details) return toast.warning("Description is required");
    if (!variantEnabled && !stock) return toast.warning("Stock is required");

    const formData = new FormData();
    formData.append("thumbnail", thumbnail[0]?.file); // Thumbnail
    formData.append("title", title);
    formData.append("category", categoryId);
    if (subCategoryId) formData.append("subCategory", subCategoryId);
    if (subSubCategoryId) formData.append("subSubCategory", subSubCategoryId);
    formData.append("brand", brand);
    formData.append("sellingPrice", sellingPrice);
    formData.append("purchasePrice", purchasePrice);
    formData.append(
      "totalStock",
      variantEnabled
        ? variants?.reduce((acc, curr) => acc + parseInt(curr?.stock), 0)
        : stock,
    );
    formData.append("discount", discount);
    formData.append("featured", featured);
    formData.append("description", details);
    formData.append("isVariant", variantEnabled);
    if (variants?.length > 0) {
      variants?.map((v) => formData.append("variantPhotos", v?.image?.file));
    }

    if (variantEnabled) {
      const formattedVariants = variants?.map((variant) => {
        return {
          attribute: variant?.variant,
          color: variant?.color,
          colorCode: variant?.colorCode,
          style: variant?.style,
          size: variant?.size,
          stock: variant?.stock,
          price: variant?.price,
        };
      });
      formData.append("variants", JSON.stringify(formattedVariants));
    }

    const res = await updateProduct({ id, formData });

    if (res?.data?.success) {
      toast.success("Product added successfully");
      setThumbnail([]);
      setTitle("");
      setCategoryId("");
      setSubCategoryId("");
      setSubSubCategoryId("");
      setBrand("");
      setDiscount("");
      setSellingPrice("");
      setPurchasePrice("");
      setStock("");
      setFeatured(false);
      setVariants("");
      setDetails("");
      navigate("/admin/product/all-products");
    } else {
      toast.error(res?.data?.message || "Failed to add product");
      console.log(res);
    }
  };

  if (pLoading) return <p>Loading...</p>;

  return (
    <div className="add_product rounded bg-base-100 shadow">
      <h3 className="border-b p-4 text-lg font-medium text-neutral">
        Update Product
      </h3>

      <div className="items-start p-4">
        <div className="text-neutral-content">
          <div className="rounded border p-4">
            <p className="mb-2 text-sm">Add Thumbnail </p>
            <ImageUploading
              value={thumbnail}
              onChange={(img) => setThumbnail(img)}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div className="grid gap-4 sm:grid-cols-2" {...dragProps}>
                  <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed p-3">
                    <span
                      onClick={onImageUpload}
                      className="cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                    >
                      Choose Image
                    </span>

                    <p className="text-neutral-content">or Drop here</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 rounded border border-dashed p-3 lg:grid-cols-3 xl:grid-cols-4">
                    {thumbnail?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/products/${img["data_url"]}`}
                          alt="thumbnail"
                          className="h-20 w-full"
                        />
                        <div
                          onClick={() => onImageRemove(index)}
                          className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>

          <div className="form_group mt-3">
            <div className="mb-5 flex flex-col gap-3 rounded border p-4">
              <div>
                <p className="text-sm">Product Title</p>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm">Category *</p>
                  <select
                    name="category"
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="" >Select Category</option>
                    {categories?.data?.map((category) => (
                      <option key={category?._id} value={category?._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm">Sub Category</p>
                  <select
                    name="sub_category"
                    value={subCategoryId}
                    onChange={(e) => setSubCategoryId(e.target.value)}
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories?.length > 0 &&
                      subCategories?.map((subCategory) => (
                        <option key={subCategory?._id} value={subCategory?._id}>
                          {subCategory?.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm">Sub SubCategory</p>
                  <select
                    name="sub_subCategory"
                    value={subSubCategoryId}
                    onChange={(e) => setSubSubCategoryId(e.target.value)}
                  >
                    <option value="">Select Sub SubCategory</option>
                    {subSubCategories?.length > 0 &&
                      subSubCategories?.map((subSubCategory) => (
                        <option
                          key={subSubCategory?._id}
                          value={subSubCategory?._id}
                        >
                          {subSubCategory?.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm">Brand</p>
                  <select
                    name="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="">Select Brand</option>
                    <option value="No Brand">No Brand</option>
                    {brands?.data?.length > 0 &&
                      brands?.data?.map((brand) => (
                        <option key={brand?._id} value={brand?.slug}>
                          {brand?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded border p-4">
              <p>Price & Discount </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm">Base Selling Price *</p>
                  <input
                    type="number"
                    value={sellingPrice}
                    name="sellingPrice"
                    onChange={(e) => setSellingPrice(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <p className="text-sm">Base Purchase Price *</p>
                  <input
                    type="number"
                    value={purchasePrice}
                    name="purchasePrice"
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <p className="text-sm">Discount %</p>
                  <input
                    type="number"
                    value={discount}
                    name="discount"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                <div>
                  <p className="text-sm">Stock *</p>
                  <input
                    type="number"
                    name="stock"
                    onChange={(e) => setStock(e.target.value)}
                    required
                    value={stock}
                    disabled={variantEnabled && "disabled"}
                  />
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="mt-4 rounded border p-4">
              <div className="flex items-center gap-3">
                <p>Variant: </p>

                <label className="relative flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    value={variantEnabled}
                    onChange={() => {
                      setVariantEnabled(!variantEnabled);
                    }}
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                </label>
              </div>
              <div className="mt-4 rounded border p-4">
                {variantEnabled && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium">Variant Values</h4>
                    {variants.map((variant, index) => (
                      <div
                        key={index}
                        className="mb-4 flex flex-col gap-3 rounded border p-4"
                      >
                        <div className="grid gap-4 lg:grid-cols-3">
                          <div>
                            <p className="text-sm">Variant Name</p>
                            <input
                              type="text"
                              value={variant?.variant || ""}
                              onChange={(e) =>
                                handleVariantChange(e, index, "variant")
                              }
                              className="w-full rounded border p-2"
                              placeholder="Ex: color, size, etc"
                            />
                          </div>
                          <div>
                            <p className="text-sm">Color Name</p>
                            <input
                              type="text"
                              value={variant?.color || ""}
                              onChange={(e) =>
                                handleVariantChange(e, index, "color")
                              }
                              className="w-full rounded border p-2"
                              placeholder="Enter color name"
                            />
                          </div>
                          <div>
                            <p className="text-sm">Color Code</p>
                            <input
                              type="text"
                              value={variant?.colorCode || ""}
                              onChange={(e) =>
                                handleVariantChange(e, index, "colorCode")
                              }
                              className="w-full rounded border p-2"
                              placeholder="Enter color code"
                            />
                          </div>
                          <div>
                            <p className="text-sm">Size</p>
                            <input
                              type="text"
                              value={variant?.size || ""}
                              onChange={(e) =>
                                handleVariantChange(e, index, "size")
                              }
                              className="w-full rounded border p-2"
                              placeholder="Enter size"
                            />
                          </div>
                          <div>
                            <p className="text-sm">Style</p>
                            <input
                              type="text"
                              value={variant?.style || ""}
                              onChange={(e) =>
                                handleVariantChange(e, index, "style")
                              }
                              className="w-full rounded border p-2"
                              placeholder="Enter size"
                            />
                          </div>
                          <div>
                            <p className="text-sm">Stock</p>
                            <input
                              type="number"
                              value={variant?.stock || ""}
                              onChange={(e) =>
                                handleVariantChange(e, index, "stock")
                              }
                              className="w-full rounded border p-2"
                              placeholder="Enter stock"
                            />
                          </div>
                          <div>
                            <p className="text-sm">Price</p>
                            <input
                              type="number"
                              defaultValue={sellingPrice}
                              onChange={(e) =>
                                handleVariantChange(e, index, "price")
                              }
                              className="w-full rounded border p-2"
                              placeholder="Enter price"
                            />
                          </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                          <p className="text-sm">Image</p>
                          <ImageUploading
                            value={variant.image ? [variant.image] : []}
                            onChange={(imageList) =>
                              handleImageChange(imageList, index)
                            }
                            dataURLKey="data_url"
                          >
                            {({ onImageUpload, onImageRemove, imageList }) => (
                              <div>
                                <button
                                  type="button"
                                  onClick={onImageUpload}
                                  className="mt-2 rounded border border-dotted border-primary px-4 py-2 text-primary"
                                >
                                  Upload Image
                                </button>
                                <div className="mt-2 flex items-center space-x-4">
                                  {imageList.map((image, idx) => (
                                    <div key={idx} className="relative">
                                      <img
                                        src={image.data_url}
                                        alt="variant"
                                        className="h-20 w-20 rounded border"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => onImageRemove(idx)}
                                        className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
                                      >
                                        <AiFillDelete />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </ImageUploading>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setVariants((prev) =>
                              prev.filter(
                                (_, variantIndex) => variantIndex !== index,
                              ),
                            )
                          }
                          className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                          Remove Variant
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setVariants((prev) => [
                          ...prev,
                          {
                            color: "",
                            colorCode: "",
                            style: "",
                            stock: 0,
                            price: 0,
                            discount: 0,
                            image: null,
                          },
                        ])
                      }
                      className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/80"
                    >
                      Add Variant
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 rounded border p-4">
              <p className="text-sm">Featured Product</p>
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <p>Status:</p>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      onChange={() => setFeatured(!featured)}
                      type="checkbox"
                      checked={featured}
                      className="peer sr-only"
                    />
                    <div className="peer h-[23px] w-11 rounded-full bg-gray-200 after:absolute after:start-[1px] after:top-[1.5px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="add_product_details mt-6 rounded border p-4">
              <p className="text-sm">Description</p>

              <div className="mt-2">
                <JoditEditor
                  ref={editor}
                  value={details}
                  onBlur={(text) => setDetails(text)}
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleAddProduct}
                type="submit"
                disabled={isLoading && "disabled"}
                className="rounded bg-primary px-10 py-2 text-base-100"
              >
                {isLoading ? "Loading..." : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
