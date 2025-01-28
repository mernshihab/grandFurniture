import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import Spinner from "../../../../components/Spinner/Spinner";

import {
  useAddTopCampaignBannerMutation,
  useGetTopCampaignBannersQuery,
  useUpdateTopCampaignBannerMutation,
} from "../../../../Redux/topCampaignBanner";

export default function ShopBanner() {
  const editor = useRef(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading } = useGetTopCampaignBannersQuery();
  const [addBanner, { isLoading: addLoading }] =
    useAddTopCampaignBannerMutation();

  const [updateBanner, { isLoading: updateLoading }] =
    useUpdateTopCampaignBannerMutation();

  const id = data?.data[0]?._id;

  const handleUpdateAddMainBanner = async () => {
    const image = images[0]?.file;

    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    if (data?.data?.length > 0) {
      const res = await updateBanner({ id, formData });
      if (res?.data?.success) {
        Swal.fire("", "Banner Update success", "success");
        setImages([]);
      } else {
        Swal.fire("", "Somethin wrong, please try again letter", "error");
      }
    } else {
      const res = await addBanner(formData);
      if (res?.data?.success) {
        Swal.fire("", "Banner Add success", "success");
        setImages([]);
      } else {
        Swal.fire("", "Somethin wrong, please try again letter", "error");
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <h1 className="font-medium text-neutral">Top Campaign Banner</h1>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="rounded bg-base-100 shadow">
          <div className="p-4">
            <div>
              <p className="border-b text-neutral-content">Banner</p>
              <div className="flex flex-col p-4">
                <ImageUploading
                  value={images}
                  onChange={(file) => setImages(file)}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="w-max rounded border border-dashed p-4"
                      {...dragProps}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          onClick={onImageUpload}
                          className="cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
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
                              className="h-28 w-full rounded"
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

                {data?.data[0]?.image && images?.length >= 0 && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/campaignBanner/${
                      data?.data[0]?.image
                    }`}
                    alt=""
                    className="mt-4 h-48 w-full rounded"
                  />
                )}
              </div>
            </div>
          </div>

          {/* title and description jodit */}
          <div className="p-4">
            <div>
              <p className="text-neutral-content">Title</p>
              <input
                type="text"
                placeholder="Title"
                className="w-full rounded border p-2"
                defaultValue={data?.data[0]?.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="rounded border md:col-span-2">
              <p className="border-b p-3"> Description</p>

              <div className="about_details p-4">
                <JoditEditor
                  ref={editor}
                  value={data?.data[0]?.description}
                  onBlur={(text) => setDescription(text)}
                />
              </div>
            </div>

            {/* <div className="mt-4">
              <p className=" text-neutral-content">Description</p>
              <textarea
                placeholder="Description"
                className="border w-full p-2 rounded"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={data?.data[0]?.description}
              ></textarea>
            </div> */}
          </div>

          <div className="mt-6 flex justify-end border-t p-4">
            <button
              disabled={(updateLoading || addLoading) && "disabled"}
              onClick={handleUpdateAddMainBanner}
              className="primary_btn"
            >
              {updateLoading || addLoading
                ? "Loading"
                : id
                  ? "Update Banner"
                  : "Add Banner"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
