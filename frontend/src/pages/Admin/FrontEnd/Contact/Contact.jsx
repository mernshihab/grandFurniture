import { useEffect, useState } from "react";
import {
  useAddContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "../../../../Redux/contact/contactApi";
import Spinner from "../../../../components/Spinner/Spinner";
import MultiSocial from "./MultiSocial";
import { toast } from "react-toastify";

export default function Contact() {
  const [socials, setSocials] = useState([]);
  const { data, isLoading } = useGetContactQuery();

  useEffect(() => {
    if (data?.data[0]?.socials) {
      setSocials(data?.data[0]?.socials);
    }
  }, [data]);

  const [updateContact, { isLoading: updateLoading }] =
    useUpdateContactMutation();

  const [addContact, { isLoading: addLoading }] = useAddContactMutation();

  const id = data?.data[0]?._id;

  const handleContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const phone = form.phone.value.trim();
    const whatsapp = form.whatsapp.value.trim();
    const messenger = form.messenger.value.trim();
    const email = form.email.value.trim();
    const address = form.address.value.trim();
    const videoURL = form.videoURL.value.trim();
    const location = form.location.value.trim();

    const contactInfo = {
      title,
      phone,
      whatsapp,
      messenger,
      email,
      address,
      socials,
      videoURL,
      location
    };

    try {
      let res;
      if (id) {
        res = await updateContact({ id, contactInfo });
      } else {
        res = await addContact(contactInfo);
      }

      if (res?.data?.success) {
        toast.success(
          id ? "Contact updated successfully" : "Contact added successfully",
        );
      } else {
        throw new Error(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="rounded bg-base-100 pb-4 shadow">
      <div className="border-b p-4 font-medium text-neutral">
        <h3>Contact Info</h3>
      </div>

      <form
        onSubmit={handleContact}
        className="form_group mx-4 mt-3 flex flex-col gap-3 rounded border p-4 text-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-neutral-content">Title</p>
            <input
              type="text"
              name="title"
              defaultValue={data?.data[0]?.title || ""}
            />
          </div>

          <div>
            <p className="text-neutral-content">Email</p>
            <input
              type="email"
              name="email"
              defaultValue={data?.data[0]?.email || ""}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-neutral-content">Phone</p>
            <input
              type="text"
              name="phone"
              defaultValue={data?.data[0]?.phone || ""}
            />
          </div>

          <div>
            <p className="text-neutral-content">Whatsapp</p>
            <input
              type="text"
              name="whatsapp"
              defaultValue={data?.data[0]?.whatsapp || ""}
            />
          </div>
          <div>
            <p className="text-neutral-content">Messenger</p>
            <input
              type="text"
              name="messenger"
              defaultValue={data?.data[0]?.messenger || ""}
            />
          </div>
        </div>

        <div>
          <p className="text-neutral-content">Address</p>
          <textarea
            name="address"
            rows="3"
            defaultValue={data?.data[0]?.address || ""}
          ></textarea>
        </div>
        <div>
          <p className="text-neutral-content">Video URL</p>
          <textarea
            name="videoURL"
            rows="3"
            defaultValue={data?.data[0]?.videoURL || ""}
          ></textarea>
        </div>
        <div>
          <p className="text-neutral-content">Map Location</p>
          <textarea
            name="location"
            rows="3"
            defaultValue={data?.data[0]?.location || ""}
          ></textarea>
        </div>

        <MultiSocial socials={socials} setSocials={setSocials} />

        <div className="flex justify-end">
          <button
            disabled={updateLoading || addLoading}
            className="primary_btn"
          >
            {updateLoading || addLoading ? "Loading..." : id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}
