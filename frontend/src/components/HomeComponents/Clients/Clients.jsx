// import { useGetAllClientQuery } from "../../Redux/client/clientApi";

export default function Clients() {
  // const { data } = useGetAllClientQuery();
  // const clients = data?.data;

  const clients = [
    {
      id: 1,
      logo: "/images/clients/client1.avif",
    },
    {
      id: 2,
      logo: "/images/clients/client2.avif",
    },
    {
      id: 3,
      logo: "/images/clients/client3.avif",
    },
    {
      id: 4,
      logo: "/images/clients/client4.avif",
    },
    {
      id: 5,
      logo: "/images/clients/client5.avif",
    },
    {
      id: 6,
      logo: "/images/clients/client6.avif",
    },
    {
      id: 7,
      logo: "/images/clients/client7.avif",
    },
    {
      id: 8,
      logo: "/images/clients/client8.webp",
    },
    {
      id: 9,
      logo: "/images/clients/client9.webp",
    },
    {
      id: 10,
      logo: "/images/clients/client.avif",
    },
  ];

  return (
    <section className="py-14">
      <h2 className="mb-4 text-center text-2xl font-medium text-neutral sm:text-3xl">
        Trusted By Top Companies
      </h2>
      <div className="container">
        <div className="grid grid-cols-5 gap-4">
          {clients?.map((client, index) => (
            <div key={index}>
              <img
                // src={`${import.meta.env.VITE_BACKEND_URL}/${client?.logo}`}
                className="h-20 w-44 object-fill"
                src={client?.logo}
                alt="client"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
