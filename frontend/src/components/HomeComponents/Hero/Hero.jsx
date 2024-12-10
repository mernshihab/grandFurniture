import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { useGetBannersQuery } from "../../../Redux/banner/bannerApi";
import Banner from "../../Skeleton/Banner/Banner";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Hero() {
  const { data, isLoading, isError } = useGetBannersQuery();

  let content = null;

  if (isLoading) {
    content = <Banner />;
  }
  if (!isLoading && !isError) {
    content = data?.data?.map((banner) => (
      <SwiperSlide key={banner._id}>
        <Link to={banner?.link}>
          <div className="relative h-full w-full">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/banner/${banner?.image}`}
              alt="banner"
              className="h-full w-full rounded object-cover"
              loading="lazy"
            />
            {/* Overlay for text */}
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black/40 p-4">
              <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-6xl">
                Modern Furniture
              </h1>
              <p className="mb-4 text-base uppercase tracking-widest text-white sm:text-xl">
                For a better way to work
              </p>
              <Link to={"/shops"} className="f_btn flex items-center gap-2 border-[2px] border-white bg-transparent md:px-4 px-3 py-1.5 md:py-2 font-semibold text-white duration-500 hover:bg-white hover:text-black">
                Shop Now
                <i>
                  <FaLongArrowAltRight className="text-xl" />
                </i>
              </Link>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <section>
      <div className="">
        <div className="items-start gap-4 lg:flex">
          <div className="hero_slider mt-2 h-[45vh] sm:h-[45vh] lg:mt-0 lg:h-screen">
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="mySwiper h-full w-full"
            >
              {content}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
