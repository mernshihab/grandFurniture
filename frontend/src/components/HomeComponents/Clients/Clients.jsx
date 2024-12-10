import { useGetAllClientQuery } from "../../../Redux/client/clientApi";

export default function Clients() {
  const { data, isError, isSuccess } = useGetAllClientQuery();
  const clients = data?.data;

  console.log(clients);

  return (
    <section className="py-14">
      <h2 className="mb-4 text-center text-2xl font-medium text-neutral sm:text-3xl">
        Trusted By Top Companies
      </h2>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {clients?.map((client, index) => (
            <div className="px-8 md:px-0" key={index}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${client?.logo}`}
                className="md:h-20 h-12 w-full md:w-44 object-fill"
                alt="client"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
