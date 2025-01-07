import { Link } from "react-router-dom";

export default function ProductCard({ product, discount: flashDiscount = 0 }) {
  const { slug, thumbnail, title, sellingPrice, discount, totalStock } =
    product;

  const newDiscount = parseInt(flashDiscount) + discount;

  console.log(totalStock);

  return (
    <>
      <div className="product_card">
        <div className="relative flex h-full flex-col justify-between">
          <Link
            onClick={() => {
              sessionStorage.setItem("discount", newDiscount);
            }}
            to={`/product/${slug}`}
          >
            <div className="relative h-52 overflow-hidden sm:h-60">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${thumbnail}`}
                alt={title}
                className="product_img h-[90%] w-full object-cover md:h-full"
                loading="lazy"
              />

              {/* {newDiscount > 0 && (
                <div className="absolute right-0 top-1 w-max rounded-l-full bg-red-600 px-2 py-px text-base-100">
                  <p>{newDiscount}%</p>
                </div>
              )} */}
            </div>

            <h1 className="title p-2 text-sm font-normal sm:text-xl">
              {title.length > 45 ? `${title.slice(0, 45)}...` : title}
            </h1>
          </Link>

          {totalStock === 0 ? (
            <p className="absolute right-0 top-0 bg-black/90 px-2 py-1.5 text-xs font-semibold text-white sm:text-sm">
              Stock Out
            </p>
          ) : (
            <div className="absolute right-0 top-1 w-max rounded-l-full bg-red-600 px-2 py-px text-base-100">
              <p>{newDiscount}%</p>
            </div>
          )}

          <div>
            <div className="p-2 pt-0">
              <div className="flex items-center gap-2">
                {newDiscount > 0 && (
                  <del className="text-xs sm:text-sm">
                    Tk{parseInt(sellingPrice).toLocaleString()}
                  </del>
                )}
                <p className="text-sm sm:text-lg">
                  Tk
                  {parseInt(
                    sellingPrice - (sellingPrice * newDiscount) / 100,
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
