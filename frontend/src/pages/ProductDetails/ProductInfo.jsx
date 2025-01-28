import { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { FiHeart, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdAddCall } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { addToCart } from "../../Redux/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Redux/wishlist/wishlistSlice";
import Rating from "../../components/Rating/Rating";
import ProductImage from "./ProductImage";
import { GoDotFill } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import RightSideInfo from "./RightSideInfo";

export default function ProductInfo({ product, parcerDescription }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const wishlists = useSelector((state) => state.wishlist.wishlists);

  const discount = sessionStorage.getItem("discount");

  const {
    title,
    thumbnail,
    brand,
    category,
    rating,
    reviewer,
    sellingPrice,
    totalStock,
    variant,
  } = product;

  const [selectedImage, setSelectedImage] = useState(thumbnail);

  const sizes = variant?.map((item) => item.size);
  const galleries = variant
    ?.filter((item) => item.image !== null)
    .map((item) => item.image);

  const colors = variant?.map((item) => ({
    image: item.image,
    color: item.color,
    colorCode: item.colorCode,
    price: item.price,
    stock: item.stock,
  }));

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStock, setSelectedStock] = useState(totalStock);
  const [selectedPrice, setSelectedPrice] = useState(sellingPrice);
  const [selectedSku, setSelectedSku] = useState();

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const updateSelectedSku = (size, color) => {
    if (size || color) {
      const selectedVariant = variant?.find((item) => {
        const sizeMatch = size && item.size ? item?.size === size : true;
        const colorMatch = item?.color === color?.color;

        return sizeMatch && colorMatch;
      });

      if (selectedVariant) {
        setSelectedSku(
          `${selectedVariant?.size || ""}${selectedVariant?.color || ""}`,
        );
        setSelectedPrice(selectedVariant?.price);
        setSelectedStock(selectedVariant?.stock);
      } else {
        console.log("Variant not found");
      }
    }
  };

  const handelSelectSize = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
    updateSelectedSku(size, selectedColor);
  };

  const handelColorSelect = (clr) => {
    if (selectedColor === clr) {
      setSelectedColor("");
    } else {
      setSelectedColor(clr);
    }

    updateSelectedSku(selectedSize, clr);
  };

  const handleBuyNow = () => {
    const sizeExists = variant.some((item) => item.size);
    if (sizeExists && !selectedSize) {
      return Swal.fire("", "Please Select Size", "warning");
    }

    const colorExists = variant.some((item) => item.color);
    if (colorExists && !selectedColor) {
      return Swal.fire("", "Please Select Color", "warning");
    }

    if (selectedStock === 0) {
      return Swal.fire("", "Product is out of stock", "warning");
    }

    const cartProduct = {
      _id: product._id,
      discount: discount,
      price: selectedPrice,
      thumbnail,
      title,
      quantity: selectedQuantity,
      sku: selectedSku,
      stock: selectedStock,
    };

    dispatch(addToCart([cartProduct]));
    navigate("/checkout");
  };

  const handelAddToCart = () => {
    const sizeExists = variant.some((item) => item.size);
    if (sizeExists && !selectedSize) {
      return Swal.fire("", "Please Select Size", "warning");
    }

    const colorExists = variant.some((item) => item.color);
    if (colorExists && !selectedColor) {
      return Swal.fire("", "Please Select Color", "warning");
    }

    if (selectedStock === 0) {
      return Swal.fire("", "Product is out of stock", "warning");
    }

    const cartProduct = {
      _id: product._id,
      discount: discount,
      price: selectedPrice,
      thumbnail,
      title,
      quantity: selectedQuantity,
      sku: selectedSku,
      stock: selectedStock,
    };

    if (carts?.length > 0) {
      const findProduct = carts?.find(
        (p) => p._id === cartProduct._id && selectedSku === p.sku,
      );

      if (findProduct) {
        return toast.error("Product already added to cart");
      } else {
        dispatch(addToCart([...carts, cartProduct]));
        toast.success("Item added to cart successfully");
      }
    } else {
      dispatch(addToCart([cartProduct]));
      toast.success("Item added to cart successfully");
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currencyCode: "BDT",
        add: {
          products: [
            {
              item_id: product._id,
              item_name: product.title,
              price: selectedPrice,
              discount: discount,
              brand: brand,
              category: category?.name,
              variant: selectedSku, // Include selected SKU
              quantity: selectedQuantity || 0,
            },
          ],
        },
      },
    });
  };

  const handelAddToWishlist = (product) => {
    const findProduct = wishlists?.find((item) => item._id === product._id);

    if (findProduct) {
      dispatch(removeFromWishlist(product));
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "remove_to_wishlist",
        ecommerce: {
          currencyCode: "BDT",
          add: {
            products: [
              {
                item_id: product._id,
                item_name: product.title,
                price: selectedPrice,
                discount: discount,
                brand: brand,
                category: category?.name,
                variant: selectedSku,
              },
            ],
          },
        },
      });
      return Swal.fire("", "Product removed from wishlist", "warning");
    } else {
      dispatch(addToWishlist([...wishlists, product]));
      Swal.fire("", "Product added to wishlist successfully", "success");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "add_to_wishlist",
        ecommerce: {
          currencyCode: "BDT",
          add: {
            products: [
              {
                item_id: product._id,
                item_name: product.title,
                price: selectedPrice,
                discount: discount,
                brand: brand,
                category: category?.name,
                variant: selectedSku,
              },
            ],
          },
        },
      });
    }
  };

  const isWishlist = wishlists?.find((item) => item._id === product._id);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5 lg:gap-6">
      {/* Image */}
      <div className="md:col-span-2">
        <ProductImage
          discount={discount}
          galleries={galleries}
          thumbnail={selectedImage}
        />
      </div>

      {/* Details */}
      <div className="md:col-span-3">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-content">
            <p className="rounded bg-primary/10 px-2 py-1 text-primary">
              {category?.name}
            </p>
          </div>

          <h1 className="mt-2 text-4xl font-semibold text-neutral">{title}</h1>

          <div className="mt-2 flex items-center gap-1 text-[13px]">
            <Rating rating={rating || 0} />
            <p className="text-xs text-neutral-content">
              ({reviewer ? reviewer : 0})
            </p>
          </div>

          <div className="text-[13px] text-neutral-content">
            {brand && (
              <p>
                <span className="text-neutral/80">Brand:</span>{" "}
                <span>{brand}</span>
              </p>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between border-b py-3 pr-2">
          <div className="flex items-center gap-6">
            <p className="text-neutral-content">Price: </p>

            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">
                ৳ {parseInt(selectedPrice - (selectedPrice * discount) / 100)}
              </p>
              {discount > 0 && (
                <del className="text-red-400">৳{selectedPrice}</del>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => handelAddToWishlist(product)}
              className={`rounded-full p-3 shadow-lg ${
                isWishlist && "bg-primary text-base-100"
              }`}
            >
              <FiHeart />
            </button>
          </div>
        </div>

        {colors?.length > 0 && (
          <div className="my-4">
            <p className="mb-1 text-lg font-semibold">Color</p>
            <div className="flex gap-2">
              {colors?.map(
                (clr, i) =>
                  clr?.color && (
                    <button
                      key={i}
                      onClick={() => {
                        handelColorSelect(clr);
                        setSelectedImage(clr?.image);
                        setSelectedPrice(clr?.price);
                      }}
                      className={`rounded-lg border-2 px-2 py-1 text-sm duration-300 hover:scale-105 ${
                        selectedColor?.colorCode === clr.colorCode
                          ? "bg-primary text-white"
                          : "bg-white text-black"
                      }`}
                      style={{
                        borderColor: clr.colorCode,
                      }}
                    >
                      {clr?.color}
                    </button>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Sizes */}
        {sizes?.length > 0 && sizes[0] && (
          <div className="my-4 gap-4">
            <p className="mb-1 text-lg font-semibold">Size</p>

            <div className="">
              {sizes?.map(
                (size) =>
                  size && (
                    <button
                      key={size}
                      onClick={() => handelSelectSize(size)}
                      className={`${
                        size === selectedSize && "bg-primary text-base-100"
                      } my-1.5 scale-[.96] rounded border px-2.5 py-1.5 text-[15px] duration-300 hover:scale-[1] hover:border-primary`}
                    >
                      {size}
                    </button>
                  ),
              )}
            </div>
          </div>
        )}

        {selectedStock > 0 ? (
          <p className="flex items-center gap-2 text-lg">
            {" "}
            <i>
              <GoDotFill className="text-lg text-green-500" />
            </i>{" "}
            In Stock
          </p>
        ) : (
          <p className="text-lg text-red-600">Out of Stock</p>
        )}

        <p className="flex items-center gap-2 text-lg">
          <i>
            <CiDeliveryTruck className="text-lg" />
          </i>
          Home delivery all over Bangladesh
        </p>

        {/* Buttons */}
        <div className="mb-6 mt-6 grid grid-cols-2 items-center gap-2 sm:grid-cols-2">
          <button
            onClick={handleBuyNow}
            className="flex scale-[.97] items-center justify-center gap-1 rounded bg-primary px-2 py-1.5 text-base-100 duration-300 hover:scale-[1]"
          >
            <IoBagCheckOutline />
            Buy Now
          </button>

          <button
            onClick={handelAddToCart}
            className="flex scale-[.97] items-center justify-center gap-1 rounded bg-accent px-2 py-1.5 text-base-100 duration-300 hover:scale-[1]"
          >
            <FaOpencart />
            Add To Cart
          </button>
        </div>
        <div className="mt-3 pl-2 text-sm text-neutral-content">
          {parcerDescription}
        </div>
        <div>
          <RightSideInfo />
        </div>
      </div>
    </div>
  );
}
