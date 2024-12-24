import { useState } from "react";
import { useGetFeaturedProductsQuery } from "../../../Redux/product/productApi";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";

export default function FeaturedProducts() {
  const [filter, setFilter] = useState(null);
  const [searchParams, setSearchParams] = useState(null);

  const { data, isLoading, isError, error } = useGetFeaturedProductsQuery({
    limit: 100,
  });
  const allProducts = data?.data;

  const { data: cataegory } = useGetCategoriesQuery();
  const categories = cataegory?.data;

  const filteredProducts = allProducts?.filter((product) =>
    filter ? product?.subCategory?._id === filter : true,
  );

  let content = null;
  if (isLoading) {
    content = <ProductCards />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && filteredProducts?.length > 0) {
    content = filteredProducts.map((product) => (
      <ProductCard key={product?._id} product={product} />
    ));
  }
  if (filteredProducts?.length === 0) {
    content = <p>No products found.</p>;
  }

  return (
    <div className="mt-2">
      <div className="container p-4">
        <div className="">
          <h1 className="text-center font-bold text-neutral md:text-2xl ">
            Featured
          </h1>
        </div>

        <div className="flex justify-center gap-2">
          {categories?.map((category) => (
            <div key={category?._id}>
              {category?.subCategories?.map((subCategory) => (
                <button
                  key={subCategory?._id}
                  className={`px-4 py-2 text-xl font-semibold ${
                    filter === subCategory?._id &&
                    "border-b-[1px] border-black"
                  }`}
                  onClick={() => {
                    setFilter(subCategory?._id);
                    setSearchParams(subCategory?._id);
                  }}
                >
                  {subCategory?.name}
                </button>
              ))}
            </div>
          ))}
          <button
            className={`px-4 py-2 text-xl font-semibold ${
              filter === null && "border-b-[1px] border-black"
            }`}
            onClick={() => {
              setFilter(null);
              setSearchParams(null);
            }}
          >
            All
          </button>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {content}
        </div>
        <div className="flex justify-center py-5">
          <Link
            to={`/shops`}
            className="f_btn flex items-center gap-2 bg-black px-4 py-2 font-semibold text-white"
          >
            View All
            <i>
              <FaLongArrowAltRight className="text-xl" />
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
}
