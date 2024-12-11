import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteFeatureProjectMutation,
  useGetFeatureProjectsQuery,
} from "../../../Redux/featureProject/featureProjectApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function FeaturesProjectList() {
  const { data, isLoading, isError, isSuccess } = useGetFeatureProjectsQuery();
  const projects = data?.data;

  const [deleteProject] = useDeleteFeatureProjectMutation();
  const deleteProjectHandler = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Project?");
    if (isConfirm) {
      try {
        const res = await deleteProject(id).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "",
            text: "Project Deleted Successfully",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "",
          text: "Something went wrong",
          icon: "error",
        });
        console.log(error);
      }
    }
  };

  let content = null;
  if (isLoading) return (content = <Spinner />);

  if (isError) {
    content = (
      <p className="mt-5 text-red-500">No Data!</p>
    );
  }

  if (!isError && isSuccess) {
    content = (
      <tbody>
        {projects?.map((project, i) => (
          <tr key={project?._id}>
            <td>{i + 1}</td>
            <td>{project?.title}</td>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  project?.image
                }`}
                alt={project?.image}
                className="h-8 w-14 rounded"
              />
            </td>
            <td>
              <div className="flex items-center gap-3">
                <Link to={`/admin/featured/edit/${project?._id}`}>
                  <AiOutlineEdit className="text-lg hover:text-red-500" />
                </Link>
                <button onClick={() => deleteProjectHandler(project?._id)}>
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
          <h1 className="font-medium text-neutral">Feature Projects</h1>
          <Link to="/admin/featured/add" className="primary_btn text-sm">
            Add Features Project
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}