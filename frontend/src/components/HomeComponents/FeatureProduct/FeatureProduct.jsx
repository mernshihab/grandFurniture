import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetTopCampaignBannersQuery } from "../../../Redux/topCampaignBanner";
import parse from "html-react-parser";

export default function FeatureProduct() {
  const { data, isLoading } = useGetTopCampaignBannersQuery();

  console.log(data?.data[0]);

  return (
    <section className="py-10">
      <div className="container">
        <div className="grid md:grid-cols-2">
          <div className="flex justify-end">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/campaignBanner/${data?.data[0]?.image}`}
              className="w-[95%]"
              alt="featureChair"
              loading="lazy"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="mt-5 w-[85%] md:mt-0 md:w-[62%]">
              <h1 className="text-4xl font-bold">{data?.data[0]?.title}</h1>
              <div className="mb-5 mt-4 text-neutral">
                {data?.data[0]?.description &&
                  parse(data?.data[0]?.description)}
              </div>
              <div className="flex py-5">
                <Link
                  to={"/shops/chair"}
                  className="f_btn flex items-center gap-2 bg-black px-4 py-2 font-semibold text-white"
                >
                  Shop Now
                  <i>
                    <FaLongArrowAltRight className="text-xl" />
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
