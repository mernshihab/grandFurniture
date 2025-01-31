import { useEffect } from "react";
import {
  useAddBusinessInfoMutation,
  useGetBusinessInfoQuery,
  useUpdateBusinessInfoMutation,
} from "../../../../Redux/businessInfoApi/businessInfoApi";
import Swal from "sweetalert2";

export default function BusinessInfo() {
  const { data } = useGetBusinessInfoQuery();
  const businessInfo = data?.data[0];
  const id = businessInfo?._id;

  const [
    addBusinessInfo,
    {
      isLoading: addIsLoading,
      isError: addIsError,
      error: addError,
      isSuccess: addIsSuccess,
    },
  ] = useAddBusinessInfoMutation();
  const [
    updateBusinessInfo,
    {
      isLoading: upIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateBusinessInfoMutation();

  const handleBusinessInfo = async (e) => {
    e.preventDefault();
    const form = e.target;
    const companyName = form.name.value;
    const companyStartYear = form.startYear.value;
    const companyType = form.type.value;
    const tagline = form.tagline.value;

    const data = {
      companyName,
      companyStartYear,
      companyType,
      tagline,
    };

    if (id) {
      await updateBusinessInfo({ id, data });
    } else {
      await addBusinessInfo(data);
    }
  };

  useEffect(() => {
    if (addIsError) {
      Swal.fire(
        "",
        addError?.data?.error ? addError?.data?.error : "Something went wrong",
        "error",
      );
      return;
    }
    if (addIsSuccess && !id) {
      Swal.fire("", "Business Info Added Successfully", "success");

      return;
    }
    if (updateIsError) {
      Swal.fire(
        "",
        updateError?.data?.error
          ? updateError?.data?.error
          : "Something went wrong",
        "error",
      );
      return;
    }
    if (updateIsSuccess && id) {
      Swal.fire("", "Business Info Updated Successfully", "success");

      return;
    }
  }, [
    addIsError,
    addIsSuccess,
    updateIsError,
    updateIsSuccess,
    addError,
    updateError,
    id,
  ]);

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">Business Info</h3>
      </div>

      <form
        onSubmit={handleBusinessInfo}
        className="form_group p-4 text-neutral-content"
      >
        {/*  */}
        <div className="grid items-start gap-4 rounded border p-4 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="mb-1">Company Name *</p>
            <input
              type="text"
              name="name"
              defaultValue={businessInfo?.companyName}
              required
            />
          </div>

          <div>
            <p className="mb-1">Company Start Year *</p>
            <input
              type="text"
              name="startYear"
              defaultValue={businessInfo?.companyStartYear}
              required
            />
          </div>

          <div>
            <p className="mb-1">Company Type</p>
            <input
              type="text"
              name="type"
              defaultValue={businessInfo?.companyType}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1">Tagline</p>
            <textarea
              name="tagline"
              rows="2"
              defaultValue={businessInfo?.tagline}
              required
            ></textarea>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={(addIsLoading || upIsLoading) && "disabled"}
              className="primary_btn"
            >
              {addIsLoading || upIsLoading
                ? "Loading..."
                : id
                  ? "Update"
                  : "Add Info"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
