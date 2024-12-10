import { useEffect, useState } from "react";
import { useGetProductBySlugQuery } from "../../Redux/product/productApi";

const Test = () => {
  const [selectedColor, setSelectedColor] = useState(""); // Default selected color
  const [selectedSize, setSelectedSize] = useState(""); // Default selected size

  const [selectedImage, setSelectedImage] = useState(null);

  const { data, isLoading } = useGetProductBySlugQuery("dfdsf-1733664722280");

  const products = data?.data;

  console.log(products);

  useEffect(() => {
    if (products) {
      setSelectedImage(products?.thumbnail);
    }
  }, [products]);

  // Find the matching variant based on selected color and size
  const selectedProduct = products?.variant?.find(
    (variant) =>
      variant.color === selectedColor && variant.size === selectedSize,
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-auto mt-16 max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">
        {products?.name || "Product Title"}
      </h1>

      {/* Display the Product Image */}
      <div className="mb-6 overflow-hidden rounded-lg border shadow-md">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/products/${selectedImage}`}
          alt="Product"
          className="h-64 w-full object-cover"
        />
      </div>

      {/* Color Options */}
      <div className="mb-4">
        <h2 className="mb-2 text-lg font-medium">Top Color</h2>
        <div className="flex gap-2">
          {products?.variant?.map((variant) => (
            <button
              key={variant.color}
              onClick={() => {setSelectedColor(variant.color);
                if (variant?.image) {
                  setSelectedImage(variant?.image);
                }
              }

              }
              className={`rounded border px-4 py-2 ${
                selectedColor === variant.color
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {variant.color}
            </button>
          ))}
        </div>
      </div>

      {/* Size Options */}
      <div className="mb-4">
        <h2 className="mb-2 text-lg font-medium">Size</h2>
        <div className="flex gap-2">
          {products?.variant?.map((variant) => (
            <button
              key={variant.size}
              onClick={() => setSelectedSize(variant.size)}
              className={`rounded border px-4 py-2 ${
                selectedSize === variant.size
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {variant.size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Display */}
      <div className="mt-6">
        <h2 className="text-lg font-medium">Price</h2>
        <p className="text-2xl font-bold text-green-600">
          ৳ {selectedProduct ? selectedProduct.price.toLocaleString() : "N/A"}
        </p>
      </div>

      {/* Display Selected Options */}
      <div className="mt-6">
        <p className="text-gray-700">
          <strong>Selected Color:</strong> {selectedColor}
        </p>
        <p className="text-gray-700">
          <strong>Selected Size:</strong> {selectedSize}
        </p>
      </div>
    </div>
  );
};

export default Test;
