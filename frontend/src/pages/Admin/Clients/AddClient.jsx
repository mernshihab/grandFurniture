import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { useAddClientMutation } from "../../../Redux/client/clientApi";

export default function AddClient() {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);

  const [addClient, { isLoading }] = useAddClientMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    // const title = e.target.title.value;

    if (image?.length <= 0) {
      return Swal.fire("", "Main image is required", "warning");
    }

    const formData = new FormData();
    formData.append("logo", image[0].file);

    try {
      const res = await addClient(formData);
      if (res?.data?.success) {
        Swal.fire("", "Service added successfully", "success");
        e.target.reset();
        setImage([]);
        navigate("/admin/client/all-client");
      } else {
        Swal.fire("", res?.data?.message || "Something went wrong!", "error");
        console.log(res);
      }
    } catch (error) {
      Swal.fire("", "Something went wrong!", "error");
      console.log(error);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Add Client</h3>
      </div>

      <form className="p-4" onSubmit={handleAdd}>
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Logo</p>
              <div>
                <ImageUploading
                  value={image}
                  onChange={(icn) => setImage(icn)}
                  dataURLKey="data_url"
                  maxNumber={1}
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

                      {image?.length > 0 && (
                        <div className="mt-4">
                          <img
                            src={image[0]["data_url"]}
                            alt=""
                            className="w-24"
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
                  )}
                </ImageUploading>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="primary_btn" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Client"}
          </button>
        </div>
      </form>
    </section>
  );
}