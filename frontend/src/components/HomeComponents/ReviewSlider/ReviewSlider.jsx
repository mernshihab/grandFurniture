import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useState } from "react";
import { useGetAllReviewsQuery } from "../../../Redux/review/reviewApi";

export default function ReviewSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useGetAllReviewsQuery();

  const reviews = data?.data;

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper?.activeIndex % reviews?.length); // Handle loop
  };

  return (
    <div className="bg-gray-800 py-10 text-white">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Don't take our word for it
        </h2>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="pb-10"
          onSlideChange={handleSlideChange}
        >
          {reviews?.map((review, index) => (
            <SwiperSlide key={review?.id}>
              <div
                className={`flex flex-col items-center rounded-lg bg-white p-6 text-black shadow-lg transition-transform duration-300 ${
                  activeIndex === index ? "scale-105" : "scale-100"
                }`}
              >
                <div className="mb-4 flex justify-center">
                  {Array(review?.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-xl text-yellow-500">
                        ★
                      </span>
                    ))}
                </div>
                <p className="mb-6 text-center italic">{review?.description}</p>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/user/${review?.user?.image}`}
                  alt={review?.name}
                  className="mb-4 h-16 w-16 rounded-full"
                />
                <h4 className="font-bold">{review?.user?.name}</h4>
                <p className="text-sm text-gray-500">{review.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
