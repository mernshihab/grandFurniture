import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import {
  useCreateAboutMutation,
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "../../../../Redux/about/aboutApi";
import Spinner from "../../../../components/Spinner/Spinner";

export default function About() {
  const editor = useRef(null);
  const { data, isLoading, isError, error } = useGetAboutQuery();
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState("");
  const [updateAbout, { isLoading: updateLoading }] = useUpdateAboutMutation();
  const [createAbout, { isLoading: addLoading }] = useCreateAboutMutation();
  const [featureProducts, setFeatureProducts] = useState(
    data?.data[0]?.featureProduct?.map((product) => ({
      ...product,
      imageFile: null, // To handle image file separately
    })) || [],
  );

  let id = data?.data[0]?._id;

  useEffect(() => {
    if (data?.data?.length > 0) {
      setFeatureProducts(
        data.data[0].featureProduct.map((product) => ({
          ...product,
          imageFile: null, // Add a placeholder for new image uploads
        })),
      );
    }
  }, [data]);

  const handleAddFeatureProduct = () => {
    setFeatureProducts([
      ...featureProducts,
      { title: "", description: "", image: "" },
    ]);
  };

  const handleRemoveFeatureProduct = (index) => {
    const updatedFeatureProducts = [...featureProducts];
    updatedFeatureProducts.splice(index, 1);
    setFeatureProducts(updatedFeatureProducts);
  };

  const handleFeatureProductChange = (index, key, value) => {
    const updatedFeatureProducts = [...featureProducts];
    updatedFeatureProducts[index][key] = value;
    setFeatureProducts(updatedFeatureProducts);
  };

  const handleUpdateAbout = async (e) => {
    e.preventDefault();
  
    const image = images[0]?.file;
    const description =
      details?.length > 0 ? details : data?.data[0]?.description;
    const title = e.target.title.value;
    const subtitle = e.target.subtitle.value;
  
    const formData = new FormData();
    formData.append("description", description);
    formData.append("title", title);
    formData.append("subTitle", subtitle);
  
    if (image) {
      formData.append("image", image);
    }
  
    // Prepare featureProducts array
    const sanitizedFeatureProducts = featureProducts.map((product, index) => ({
      title: product.title,
      description: product.description,
      image: product.image || null, // Include existing image URL if no new image is provided
    }));
  
    // Stringify the array
    formData.append("featureProduct", JSON.stringify(sanitizedFeatureProducts));
  
    // Add image files
    featureProducts.forEach((product) => {
      if (product.imageFile) {
        formData.append("featureProductImages", product.imageFile);
      }
    });
  
    if (data?.data[0] && id) {
      const res = await updateAbout({ id, formData });
      if (res?.data?.success) {
        toast.success("About updated successfully");
        setImages([]);
      } else {
        toast.error(res?.data?.message || "Failed to update about");
        console.log(res);
      }
    } else {
      const res = await createAbout(formData);
      if (res?.data?.success) {
        toast.success("About added successfully");
        setImages([]);
      } else {
        toast.error(res?.data?.message || "Failed to add about");
        console.log(res);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <p>{error?.data?.error ? error?.data?.error : "something went wrong"}</p>
    );
  }

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">About</h3>
      </div>

      <form onSubmit={handleUpdateAbout} className="p-4">
        <div className="shadhow mb-4 grid items-start gap-4 rounded bg-base-100 sm:grid-cols-2">
          <div className="form_group mt-2">
            <p className="text-neutral-content">Title</p>
            <input
              type="text"
              name="title"
              required
              defaultValue={data?.data[0]?.title}
            />
          </div>
          <div className="form_group mt-2">
            <p className="text-neutral-content">Subtitle</p>
            <input
              type="text"
              name="subtitle"
              required
              defaultValue={data?.data[0]?.subTitle}
            />
          </div>
        </div>

        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded border">
            <div>
              <p className="border-b p-3">Image</p>
              <div className="p-4">
                <ImageUploading
                  value={images}
                  onChange={(icn) => setImages(icn)}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="rounded border border-dashed p-4"
                      {...dragProps}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          onClick={onImageUpload}
                          className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                        >
                          Choose Image
                        </span>

                        <p className="text-neutral-content">or Drop here</p>
                      </div>

                      <div className={`${images?.length > 0 && "mt-4"} `}>
                        {images?.map((img, index) => (
                          <div key={index} className="image-item relative">
                            <img
                              src={img["data_url"]}
                              alt=""
                              className="w-40"
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

                {data?.data[0]?.image && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/aboutus/${
                      data?.data[0]?.image
                    }`}
                    alt=""
                    className="mt-4 w-32"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="rounded border md:col-span-2">
            <p className="border-b p-3">Description</p>

            <div className="p-4">
              <JoditEditor
                ref={editor}
                value={
                  data?.data[0]?.description?.length > 0
                    ? data?.data[0]?.description
                    : details
                }
                onBlur={(text) => setDetails(text)}
              />
            </div>
          </div>
        </div>

        <div className="rounded border">
          <p className="border-b p-3">Feature</p>
          <div className="p-4">
            {featureProducts?.map((product, index) => (
              <div key={index} className="mb-4 border p-4">
                <div className="flex justify-between">
                  <h4>Feature {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeatureProduct(index)}
                    className="text-red-500 text-2xl"
                  >
                    <MdCancel />
                  </button>
                </div>
                <div className="form_group mt-2">
                  <p className="text-neutral-content">Title</p>
                  <input
                    type="text"
                    value={product.title}
                    onChange={(e) =>
                      handleFeatureProductChange(index, "title", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form_group mt-2">
                  <p className="text-neutral-content">Description</p>
                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) =>
                      handleFeatureProductChange(
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    required
                  />
                </div>
                <div className="form_group mt-2">
                  <p className="text-neutral-content">Image</p>
                  <ImageUploading
                    value={
                      product?.imageFile ? [{ file: product.imageFile }] : []
                    }
                    onChange={(imageList) =>
                      handleFeatureProductChange(
                        index,
                        "imageFile",
                        imageList[0]?.file,
                      )
                    }
                    dataURLKey="data_url"
                  >
                    {({ onImageUpload, onImageRemove, dragProps }) => (
                      <div
                        className="rounded border border-dashed p-4"
                        {...dragProps}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            onClick={onImageUpload}
                            className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                          >
                            Choose Image
                          </span>
                          <p className="text-neutral-content">or Drop here</p>
                        </div>
                        <div
                          className={`${product.imageFile || product.image ? "mt-4" : ""} `}
                        >
                          {(product?.imageFile || product?.image) && (
                            <div className="image-item relative">
                              <img
                                src={
                                  product.imageFile
                                    ? URL.createObjectURL(product.imageFile)
                                    : `${import.meta.env.VITE_BACKEND_URL}/aboutus/${product.image}`
                                }
                                alt=""
                                className="w-40"
                              />
                              <div
                                onClick={() => onImageRemove(0)}
                                className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                              >
                                <AiFillDelete />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFeatureProduct}
              className="mt-4 w-max rounded bg-primary px-4 py-2 text-white"
            >
              Add Feature
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            disabled={updateLoading && "disabled"}
            className="primary_btn"
          >
            {updateLoading || addLoading ? "Loading" : id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}
