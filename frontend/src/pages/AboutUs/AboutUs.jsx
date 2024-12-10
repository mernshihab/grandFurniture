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
  console.log(about);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="mt-16 py-5">
      <div className="relative flex h-[40vh] lg:h-screen w-full items-center justify-center">
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
        <div className="mt-5 grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div>
              <img
                src="/images/about/about.webp"
                className="h-full w-full"
                alt="about"
              />
            </div>
            <h3 className="mt-4 px-2 text-3xl font-bold">
              Design your corporate environment with GRID!
            </h3>
            <p className="mt-4 px-2.5">
              GRID gives your office an elegant look and makes your corporate
              environment enjoyable. While working at an office, your
              surroundings matter the most. We ensure you a comfortable and
              premium quality via our products that would make your work
              environment energetic!
            </p>
          </div>
          <div className="text-center">
            <div>
              <img
                src="/images/about/about2.webp"
                className="h-full w-full"
                alt="about"
              />
            </div>
            <h3 className="mt-4 px-2 text-3xl font-bold">
              Meaningful & Minimal Design For Your Home.
            </h3>
            <p className="mt-4 px-2.5">
              We create designs which bring a spark to your office or home. If
              you take a look at our designs, each design has a story to share!
              Our breathable mesh material provides an optimal air flow to avoid
              sweating and sticking, keep air circulation for extra comfy, and
              the mesh office chair resists abrasion and transformation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
