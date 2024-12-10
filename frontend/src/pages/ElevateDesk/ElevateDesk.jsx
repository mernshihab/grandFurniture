import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Redux/product/productApi";

export default function ElevateDesk() {
  const { subCategory } = useParams();

  let category = "table";

  const query = {};
  const [currentPage, setCurrentPage] = useState(1);
  query["page"] = currentPage;
  query["limit"] = 8;
  query["category"] = category;
  query["subCategory"] = subCategory;

  const { data, isLoading, isFetching, isError, error } =
    useGetAllProductsQuery({
      ...query,
    });

  console.log(data?.data);

  return (
    <section className="mt-20">
      <div className="relative mb-14 flex h-[40vh] w-full items-center lg:h-screen">
        <div className="container z-10">
          <h1 className="text-3xl font-bold text-white md:text-6xl">
            GRAND <br /> Elevating Desk Series
          </h1>
          <p className="mt-3 text-xl uppercase tracking-wide text-white md:text-2xl md:tracking-wider">
            The dream desk of yours!
          </p>
        </div>
        <div className="">
          <img
            className="absolute left-0 top-0 h-full w-full object-cover"
            src="/images/elevate.jpg"
            alt="Banner"
          />
        </div>
        <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
      </div>
      <div className="container mt-4">
        <div className="py-5 text-center">
          <h4 className="text-lg uppercase tracking-wider text-neutral">
            Best Seller
          </h4>
          <h3 className="mt-1.5 text-3xl font-bold underline">
            GRAND Elevating Desk Series
          </h3>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {data?.data?.map((product) => (
            <div key={product._id} className="group col-span-4 md:col-span-1">
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/products/${product?.thumbnail}`}
                  alt={product?.title}
                  className="h-[420px] w-full rounded-md object-cover"
                />
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Link
                    to={`/product/${product?.slug}`}
                    className="rounded-md bg-white px-4 py-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <h1 className="text-lg">{product?.title}</h1>
                <p className="">
                  <div className="flex items-end gap-2 text-sm">
                    <p className="">
                      ৳{" "}
                      {parseInt(
                        product?.sellingPrice -
                          (product?.sellingPrice * product?.discount) / 100,
                      )}
                    </p>
                    {product?.discount > 0 && (
                      <del className="text-red-400">
                        ৳{product?.sellingPrice}
                      </del>
                    )}
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-2 md:grid-cols-2">
          <div className="md:px-24 sticky">
            <h5 className="text-lg text-neutral">Grand ELEVATING DESK</h5>
            <h3 className="mt-1.5 text-4xl font-bold">
              Foundation for Flexible Work
            </h3>
            <div className="text-neutral mt-5">
              <p
                style={{
                  color: "rgb(28, 29, 29)",
                  fontSize: "17px",
                  fontFamily: "Futura, sans-serif",
                }}
              >
                Our coated steel base, two-stage columns and adjustable feet
                eliminate oscillation and ensure stability on any surface.
                EasyGlide motors make adjustments fast but smooth enough not to
                spill your coffee.
                <br /><br />
                Impact resistant melamine top in woodgrain or white
                <br /><br />
                No coffee spills: electric motors for a smooth raise
                <br /><br />
                Two-stage lifting columns for incredible stability
                <br /><br />
                Find the perfect height with centimeter-level adjustment
                <br /><br />
                Good for:
                <br /><br />
                Encouraging movement and energy during the workday
                <br /><br />
                Curing procrastination (results may vary) with great design
              </p>
            </div>
          </div>
          <div>
            <img src="/images/elevate.webp" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
