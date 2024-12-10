import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import React, { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

export default function ProductImage({ thumbnail, galleries, discount }) {
  const [showImage, setShowImage] = useState(thumbnail);
  useEffect(() => {
    setShowImage(thumbnail);
  }, [thumbnail]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = React.useRef(null);

  // Handle mouse movement to calculate position for zoomed image
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* <img
          src={`${import.meta.env.VITE_BACKEND_URL}/products/${showImage}`}
          alt="thumbnail"
          className="h-[350px] w-full rounded"
          loading="lazy"
        /> */}

        <div className="flex items-center justify-center gap-8">
          <div
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Main Image */}
            <img
              ref={imageRef}
              src={`${import.meta.env.VITE_BACKEND_URL}/products/${showImage}`}
              alt="Zoomable"
              className="h-[500px] w-[500px] rounded-md object-cover"
            />

            {/* Zoomed Image */}
            {isHovered && (
              <div
                className="absolute left-full top-0 z-40 ml-4 h-[400px] w-[400px] overflow-hidden rounded-md border border-gray-400"
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}/products/${showImage})`,
                  backgroundSize: "300%", // Increase this to control zoom level
                  backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                }}
              ></div>
            )}
          </div>
        </div>

        {/* <InnerImageZoom
          src={`${import.meta.env.VITE_BACKEND_URL}/products/${showImage}`}
          zoomSrc={`${import.meta.env.VITE_BACKEND_URL}/products/${showImage}`}
          zoomType="hover"
          className="h-[380px] w-full rounded object-cover"
          loading="lazy"
        /> */}

        {/* Discount */}
        {discount > 0 && (
          <div className="absolute right-0 top-1 w-max rounded-l-full bg-red-600 px-2 py-px text-base-100">
            <p>{discount}%</p>
          </div>
        )}
      </div>

      <div className="mt-2">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          className="mySwiper h-full w-full"
        >
          {galleries?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${img}`}
                alt={img}
                className="h-20 w-full cursor-pointer rounded object-cover"
                loading="lazy"
                onClick={() => setShowImage(img)}
              />
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/products/${thumbnail}`}
              alt="thumbnail"
              className="h-14 w-full cursor-pointer rounded object-cover"
              loading="lazy"
              onClick={() => setShowImage(thumbnail)}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
