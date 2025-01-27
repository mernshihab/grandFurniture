import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { useGetFeatureByIdQuery, useUpdateFeatureMutation } from "../../../Redux/feature/featureApi";

export default function EditFeature() {

  const navigate = useNavigate();
    const editor = useRef(null);
    const { id } = useParams();
  
    const { data: projectData, isLoading } = useGetFeatureByIdQuery(id);
    const project = projectData?.data;
  
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState("");
  
    const [updateFeatureProject, { isLoading: isUpdating }] =
      useUpdateFeatureMutation();
  
    useEffect(() => {
      if (project) {
        setDescription(project.description);
        setImage([
          {
            data_url: `${import.meta.env.VITE_BACKEND_URL}/uploads/features/${project.image}`,
          },
        ]);
      }
    }, [project]);
  
    const handleEditFeaturesProject = async (e) => {
      e.preventDefault();
      const title = e.target.title.value;
  
      const formData = new FormData();
      formData.append("title", title);
  
      if (description.length > 0) {
        formData.append("description", description);
      } else {
        formData.append("description", project?.description);
      }
  
      if (image?.length > 0 && image[0].file) {
        formData.append("image", image[0].file);
      }
  
      try {
        const res = await updateFeatureProject({ id, formData }).unwrap();
  
        if (res?.success) {
          Swal.fire("", "Project updated successfully", "success");
          navigate("/admin/feature");
        } else {
          Swal.fire("", "Something went wrong!", "error");
        }
      } catch (error) {
        Swal.fire("", error?.message || "Failed to update project", "error");
      }
    };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Edit Feature Project</h3>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form className="p-4" onSubmit={handleEditFeaturesProject}>
          <div className="flex flex-col gap-4 text-neutral-content">
            <div className="grid items-center gap-3 sm:grid-cols-2 md:grid-cols-3">
              {/* title */}
              <div>
                <p className="mb-1">Title</p>
                <input
                  type="text"
                  name="title"
                  defaultValue={project?.title}
                  required
                />
              </div>
            </div>

            {/* image */}
            <div className="grid gap-3 rounded border border-dashed p-4 sm:grid-cols-2">
              <div>
                <p className="mb-1">Image</p>
                <div>
                  <ImageUploading
                    value={image}
                    onChange={(icn) => setImage(icn)}
                    dataURLKey="data_url"
                  >
                    {({ onImageUpload, onImageRemove, dragProps }) => (
                      <div {...dragProps}>
                        <div className="flex items-center gap-2">
                          <span
                            onClick={onImageUpload}
                            className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                          >
                            Choose Image
                          </span>

                          <p className="text-neutral-content">or Drop here</p>
                        </div>

                        <div className={`${image?.length > 0 && "mt-4"} `}>
                          {image?.map((img, index) => (
                            <div key={index} className="image-item relative">
                              <img
                                src={img["data_url"]}
                                alt=""
                                className="w-24"
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
              </div>

              {project?.image && (
                <div className="border-l">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      project?.image
                    }`}
                    alt=""
                    className="mx-auto w-28"
                  />
                </div>
              )}
            </div>

            {/* description */}
            <div className="rounded border md:col-span-2">
              <p className="border-b p-3">Project Description</p>

              <div className="about_details p-4">
                <JoditEditor
                  ref={editor}
                  value={description}
                  onBlur={(text) => setDescription(text)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="admin_btn" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Edit Project"}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
