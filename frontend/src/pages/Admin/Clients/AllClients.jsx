import { AiOutlineDelete, } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteClientMutation,
  useGetAllClientQuery,
} from "../../../Redux/client/clientApi";

export default function AllClients() {
  const { data, isError, isSuccess } = useGetAllClientQuery();
  const clients = data?.data;

  const [deleteClient] = useDeleteClientMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Project?");
    if (isConfirm) {
      try {
        const res = await deleteClient(id);
        if (res?.data?.success) {
          Swal.fire("", "Client Deleted Successfully", "success");
        } else {
          Swal.fire("", res?.data?.message || "Something went wrong", "error");
          console.log(res);
        }
      } catch (error) {
        Swal.fire("", error?.message || "Something went wrong", "error");
        console.log(error);
      }
    }
  };

  let content = null;

  if (isError) {
    content = (
      <p className="mt-5 text-red-500">Something went wrong to get data!</p>
    );
  }

  if (!isError && isSuccess) {
    content = (
      <tbody>
        {clients?.map((client, i) => (
          <tr key={client?._id}>
            <td>{i + 1}</td>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${client?.logo}`}
                alt={client?.logo}
                className="h-8 w-14 rounded"
              />
            </td>
            <td>
              <div className="flex items-center gap-3">
                <button onClick={() => handleDelete(client?._id)}>
                  <AiOutlineDelete className="text-lg hover:text-red-500" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Client</h1>
          <Link to="/admin/client/add-client" className="primary_btn text-sm">
            Add Client
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Logo</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}