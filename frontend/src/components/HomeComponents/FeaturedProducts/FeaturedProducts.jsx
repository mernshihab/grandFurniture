import { useState } from "react";
import { useGetFeaturedProductsQuery } from "../../../Redux/product/productApi";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function FeaturedProducts() {
  const [filter, setFilter] = useState("Chair");

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
            onClick={() => setFilter("Chair")}
          >
            Chair
          </button>
          <button
            className={`px-4 py-2 text-2xl font-bold ${
              filter === "Table" && "border-b-[1px] border-black"
            }`}
            onClick={() => setFilter("Table")}
          >
            Table
          </button>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {content}
        </div>
        <div className="flex justify-center py-5">
          {/* <button className="group relative flex items-center gap-3 overflow-hidden bg-black px-4 py-2 text-white duration-300">
            View All
            <FaLongArrowAltRight className="translate-x-[-10px] text-white opacity-0 transition-all text-xl duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100" />
          </button> */}

          <button className="f_btn flex items-center gap-2 bg-black px-4 py-2 text-white">
            View All
            <i>
              <FaLongArrowAltRight />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
}
