import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

const ChooseByCategory = () => {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const categories = data?.data;

  let content = null;
  if (isLoading) {
    content = <CategoryCard />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError) {
    content = categories?.map((category) => (
      <Link
        key={category?._id}
        to={`shops/${category.slug}`}
        className="flex items-center justify-center rounded text-center duration-300 hover:bg-primary/5"
      >
        <div className="group relative">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
            alt={category?.name}
            className="mx-auto h-full w-full"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 flex h-full w-full place-items-end bg-black/20">
            <h6 className="relative mb-5 ml-5 pb-1 text-base font-semibold text-white duration-500 group-hover:mb-7 md:text-2xl">
              {category?.name}
              <span className="absolute bottom-0 left-0 h-[2px] w-[0px] bg-white transition-all duration-500 group-hover:mb-1 group-hover:w-full"></span>
            </h6>
          </div>
        </div>
      </Link>
    ));
  }

  if (categories?.length === 0) return;

  return (
    <div className="mt-6 hidden md:block">
      <div className="container rounded p-3">
        <div className="py-8 text-center">
          <h1 className="font-medium text-black md:text-3xl md:font-bold">
            We do work furniture a little bit different.
          </h1>
          <p className="mt-4 text-neutral">
            That means easy, affordable, and flexible—whether you’re furnishing
            your home office or your business.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChooseByCategory;
