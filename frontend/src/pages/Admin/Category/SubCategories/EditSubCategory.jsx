import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../../components/Spinner/Spinner";
import Swal from "sweetalert2";
import {
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "../../../../Redux/subCategory/subCategoryApi";
import { useGetCategoriesQuery } from "../../../../Redux/category/categoryApi";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function EditSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [icons, setIcons] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isLoading } = useGetSubCategoryQuery(id);
  const { data: category } = useGetCategoriesQuery();
  const categories = category?.data;

  useEffect(() => {
    if (data) {
      setSelectedCategory(data?.data?.category);
      if (data?.data?.icon) {
        setIcons([{ data_url: data.data.icon }]);
      }
      if (data?.data?.featured) {
        console.log(data?.data?.featured);
        setFeatured(data?.data?.featured);
      }
    }
  }, [data]);

  const [updateSubCategory, { isLoading: updateLoading }] =
    useUpdateSubCategoryMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const categoryId = e.target.category.value;
    let icon = icons[0]?.file || icons[0]?.data_url;

    if (!categoryId) {
      return Swal.fire("", "Category is required", "warning");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("featured", featured);
    formData.append("categoryId", categoryId);
    if (icons[0]?.file) {
      formData.append("icon", icon);
    }

    const result = await updateSubCategory({ id, formData });
    if (result?.data?.success) {
      Swal.fire("", "Update Success", "success");
      navigate("/admin/category/sub-categories");
    } else {
      Swal.fire("", "Something went wrong", "error");
    }
  };

  return (
    <form
      onSubmit={handleUpdateCategory}
      className="shadhow rounded bg-base-100 p-4 sm:w-1/2"
    >
      <div>
        <p>Icon</p>
        <ImageUploading
          value={icons}
          onChange={(icn) => setIcons(icn)}
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

              <div className={`${icons?.length > 0 && "mt-4"} `}>
                {icons?.map((img, index) => (
                  <div key={index} className="image-item relative">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${img["data_url"]}`}
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
      </div>

      <div className="form_group mt-2">
        <p>Sub Category Name</p>
        <input
          type="text"
          name="name"
          defaultValue={data?.data?.name}
          required
        />
      </div>

      <div className="form_group mt-4">
        <p>Category</p>
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category?.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 rounded border p-4">
        <p className="text-sm">Featured Category</p>
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

      <div className="mt-4">
        <button
          className="rounded bg-primary px-6 py-1.5 text-base-100"
          disabled={updateLoading && "disabled"}
        >
          {updateLoading ? "Loading.." : "Update"}
        </button>
      </div>
    </form>
  );
}
