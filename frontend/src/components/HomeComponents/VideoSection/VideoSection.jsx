export default function VideoSection() {
  return (
    <div className="relative h-48 overflow-hidden sm:h-[400px] lg:h-[550px]">
      {/* Video Background */}
      <video
        loop
        autoPlay
        muted
        disablePictureInPicture
        playsInline
        preload="metadata"
        poster="https://www.holidaydiscountcentre.co.uk/images/newsletter/hardrockcunslide29mar.gif"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          width: `100%`,
          transition: "width 0.5s ease",
          margin: "0 auto",
        }}
      >
        <source
          type="video/mp4"
          src="https://res.cloudinary.com/diliweeow/video/upload/v1733120865/grq7un4v6mol88zq6wfc.mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Text Overlay */}
      <div className="absolute left-[20%] top-1/3 z-10 w-[330px] -translate-x-1/4 -translate-y-1/4 transform rounded bg-white bg-opacity-80 p-8 shadow-lg">
        <h1 className="text-lg font-normal text-black uppercase">GRAND FURNITURE</h1>
        <h3 className="text-3xl font-extrabold text-black">For 21st Century</h3>
        <p className="mt-2 text-lg text-black">
          We're a furniture brand that carries everything needed to make your
          house or office look modern with minimal furniture and boosts up your
          work energy!
        </p>
      </div>
    </div>
  );
}
