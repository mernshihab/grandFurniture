import { useGetAboutQuery } from "../../Redux/about/aboutApi";
import Spinner from "../../components/Spinner/Spinner";
import parcer from "html-react-parser";
import usePageView from "../../hooks/usePageView";

export default function AboutUs() {
  window.scroll(0, 0);
  usePageView("About Us");
  const { data, isLoading } = useGetAboutQuery();
  const about = data?.data[0];
  const parcerDescription = about?.description && parcer(about?.description);
  console.log("About", about);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="mt-16 py-5">
      <div className="relative flex h-[40vh] w-full items-center justify-center lg:h-screen">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/aboutus/${about?.image}`}
          alt="About Photo"
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
        <div className="z-10 text-center text-white">
          <h2 className="text-5xl font-bold">{about?.title}</h2>
          <p className="mt-2.5 text-xl tracking-wider">{about?.subTitle}</p>
        </div>
      </div>
      <div className="container py-10">
        <div className="mx-auto w-[80%]">{parcerDescription}</div>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {about?.featureProduct?.map((product, i) => (
            <div key={i} className="text-center">
              <div>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/aboutus/${product?.image}`}
                  className="h-full w-full"
                  alt="about"
                />
              </div>
              <h3 className="mt-4 px-2 text-3xl font-bold">
                {product?.title}
              </h3>
              <p className="mt-4 px-2.5">
                {product?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
