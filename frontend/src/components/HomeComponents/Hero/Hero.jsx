import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { useGetBannersQuery } from "../../../Redux/banner/bannerApi";
import Banner from "../../Skeleton/Banner/Banner";
import { Link } from "react-router-dom";

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
          <div className="relative w-full h-full">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/banner/${banner?.image}`}
              alt="banner"
              className="w-full h-full rounded object-cover"
              loading="lazy"
            />
            {/* Overlay for text */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col justify-center items-center p-4">
              <h1 className="text-white text-2xl sm:text-3xl md:text-6xl font-bold mb-2">Modern Furniture</h1>
              <p className="text-white text-sm sm:text-xl tracking-widest uppercase">For a better way to work</p>
              <button className="border border-white hover:bg-white hover:text-black text-white px-4 py-2 font-semibold duration-300 mt-5">Shop Now</button>
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
          <div className="hero_slider mt-2 h-36 sm:h-52 lg:mt-0 lg:h-screen">
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
