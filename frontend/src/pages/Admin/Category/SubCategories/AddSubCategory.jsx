import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ImageUploading from "react-images-uploading";
import { useGetCategoriesQuery } from "../../../../Redux/category/categoryApi";
import { useAddSubCategoryMutation } from "../../../../Redux/subCategory/subCategoryApi";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

export default function AddSubCategory() {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCategoriesQuery();
  const [icons, seticons] = useState([]);
  const [addSubCategory, { isLoading }] = useAddSubCategoryMutation();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const categoryId = e.target.category.value;
    let icon = icons[0]?.file;

    if (!categoryId) {
      return Swal.fire("", "Category is required", "warning");
    }
    if (!icon) {
      return Swal.fire("", "Icon is required", "error");
    }

    const formData = new FormData();
    formData.append("icon", icon);
    formData.append("name", name);
    formData.append("categoryId", categoryId);

    const result = await addSubCategory(formData);
    if (result?.data?.success) {
      Swal.fire("", "add success", "success");
      navigate("/admin/category/sub-categories");
    } else {
      Swal.fire("", "Somethin went wrong", "error");
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="shadhow rounded bg-base-100 p-4 sm:w-1/2"
    >
      <div>
        <p className="text-neutral-content">Icon</p>
        <ImageUploading
          value={icons}
          onChange={(icn) => seticons(icn)}
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
                    <img src={img["data_url"]} alt="" className="w-40" />
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
        <p className="text-neutral-content">Sub Category name</p>
        <input type="text" name="name" required />
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Category</p>
        <select name="category">
          {isSuccess &&
            data?.data?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mt-4">
        <button
          className="primary_btn text-sm"
          disabled={isLoading && "disabled"}
        >
          {isLoading ? "Loading.." : "Add Sub Category"}
        </button>
      </div>
    </form>
  );
}
