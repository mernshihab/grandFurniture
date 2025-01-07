import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

const ChooseByCategory = () => {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const categories = data?.data;

  console.log(categories);

  let content = null;
  if (isLoading) {
    content = <CategoryCard />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError) {
    content = categories?.map((category, i) => (
      <div key={i} className="flex justify-center">
        <div className="">
          <h3 className="py-5 text-center text-lg font-bold md:text-2xl">
            {category?.name}
          </h3>
          <div className="grid gap-5 md:grid-cols-2" key={i}>
            {category?.subCategories?.map((subCategory, i) => (
              <Link
                to={`/shops/${category?.slug}/${subCategory.slug}`}
                className="group relative flex flex-col items-center justify-center"
                key={i}
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${subCategory?.icon}`}
                  alt={subCategory?.name}
                  className="h-40 w-full rounded object-cover md:h-72"
                />
                <div className="absolute bottom-0 left-0 flex h-full w-full place-items-end rounded bg-black/20">
                  <h6 className="relative mb-5 ml-5 pb-1 text-base font-semibold text-white duration-500 group-hover:mb-7 md:text-2xl">
                    {subCategory?.name}
                    <span className="absolute bottom-0 left-0 h-[2px] w-[0px] bg-white transition-all duration-500 group-hover:mb-1 group-hover:w-full"></span>
                  </h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    ));
  }

  if (categories?.length === 0) return;

  return (
    <div className="mt-6">
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

        <div className="mt-4 grid grid-cols-2 gap-2 md:gap-20">{content}</div>
      </div>
    </div>
  );
};

export default ChooseByCategory;
