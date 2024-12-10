import { useState } from "react";
import { useGetFeaturedProductsQuery } from "../../../Redux/product/productApi";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const [filter, setFilter] = useState("Chair");
  const [searchParams, setSearchParams] = useState("chair");

  const { data, isLoading, isError, error } = useGetFeaturedProductsQuery({
    limit: 100,
  });
  const allProducts = data?.data;

  const filteredProducts = allProducts?.filter(
    (product) => product?.category?.name === filter,
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
          <h1 className="text-center font-medium text-neutral md:text-xl md:font-medium">
            Featured
          </h1>
        </div>

        <div className="flex justify-center gap-2">
          <button
            className={`px-4 py-2 text-2xl font-bold ${
              filter === "Chair" && "border-b-[1px] border-black"
            }`}
            onClick={() => {
              setFilter("Chair");
              setSearchParams("chair");
            }}
          >
            Chair
          </button>
          <button
            className={`px-4 py-2 text-2xl font-bold ${
              filter === "Table" && "border-b-[1px] border-black"
            }`}
            onClick={() => {
              setFilter("Table");
              setSearchParams("table");
            }}
          >
            Table
          </button>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {content}
        </div>
        <div className="flex justify-center py-5">
          <Link
            to={`/shops/${searchParams}`}
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
