import { useGetFeatureProjectsQuery } from "../../Redux/featureProject/featureProjectApi";
import parse from "html-react-parser";

export default function FeatureSection() {
  const {data, isLoading, isError, isSuccess} = useGetFeatureProjectsQuery();

  const features = data?.data;

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {features?.map((feature) => (
            <div key={feature?.id} className="text-center">
              <div className="relative max-h-96 w-full overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${feature?.image}`}
                  alt={feature.title}
                  className="mb-4 h-96 w-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              <h3 className="mb-2 mt-5 text-xl font-bold">{feature?.title}</h3>
              <p className="px-2 text-base leading-7 text-gray-600">
                {feature?.description && parse(feature?.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
