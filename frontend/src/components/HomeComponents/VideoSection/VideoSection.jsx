import { useEffect, useState } from "react";
import { useGetContactQuery } from "../../../Redux/contact/contactApi";

export default function VideoSection() {
  const { data, isLoading } = useGetContactQuery();
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    if (data && data.data?.length > 0) {
      setVideoURL(data.data[0]?.videoURL);
    }
  }, [data]);

  return (
    <div className="relative">
      <div className="h-full sm:h-[400px] lg:h-[550px]">
        {isLoading ? (
          <p>Loading video...</p>
        ) : videoURL ? (
          <video
            loop
            autoPlay
            muted
            disablePictureInPicture
            playsInline
            preload="metadata"
            poster="https://www.holidaydiscountcentre.co.uk/images/newsletter/hardrockcunslide29mar.gif"
            className="md:absolute inset-0 h-full w-full object-cover"
            style={{
              width: `100%`,
              transition: "width 0.5s ease",
              margin: "0 auto",
            }}
          >
            <source type="video/mp4" src={videoURL} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Video URL not available</p>
        )}
        <div
          className="md:left-[20%] md:top-1/3 z-10 md:w-[330px] md:-translate-x-1/4 md:-translate-y-1/4 md:transform rounded md:bg-white md:bg-opacity-80 p-8 md:shadow-lg md:absolute"
        >
          <h1 className="text-lg font-normal uppercase text-black">
            GRAND FURNITURE
          </h1>
          <h3 className="text-3xl font-extrabold text-black">
            For 21st Century
          </h3>
          <p className="mt-2 text-lg text-black">
            We're a furniture brand that carries everything needed to make your
            house or office look modern with minimal furniture and boosts up
            your work energy!
          </p>
        </div>
      </div>
    </div>
  );
}
