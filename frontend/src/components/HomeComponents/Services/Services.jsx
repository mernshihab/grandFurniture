import { useGetFeaturesQuery } from "../../../Redux/feature/featureApi";
import parse from "html-react-parser";

const Services = () => {
  const { data } = useGetFeaturesQuery();
  const features = data?.data;

  console.log(features);
  return (
    <div className="bg-white py-8 md:py-20">
      <div className="container mx-auto">
        <div
          data-aos="fade-up"
          className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Free Delivery */}
          {features?.map((feature) => (
            <div key={feature?._id} className="flex flex-col items-center">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${feature?.image}`}
                alt="Icon"
                className="h-12 w-12 object-cover"
              />
              <h6 className="mb-2 text-xl font-semibold">{feature?.title}</h6>
              <p className="text-sm text-gray-600">
                {feature?.description && parse(feature?.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
