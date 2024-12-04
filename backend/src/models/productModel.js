const mongoose = require("mongoose");
const FlashDeal = require("./flashDealModel");

const productSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
    subSubCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubSubCategory",
    },
    brand: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount must be between 0 and 100"],
      max: [100, "Discount must be between 0 and 100"],
    },
    description: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    isVariant: {
      type: Boolean,
      default: false,
    },
    variant: [
      {
        attribute: { type: String, required: true },
        value: [
          {
            colorName: { type: String },
            colorCode: { type: String },
            size: { type: [String] }, // For sizes, storing an array of size options
            sellingPrice: { type: Number },
            image: { type: String }, // URL or path to the image
          },
        ],
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    reviewer: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.pre("findOneAndDelete", async function (next) {
  const productId = this.getQuery()._id;
  const result = await FlashDeal.countDocuments({
    "flashProducts.product": productId,
  });

  if (result > 0) {
    const error = new Error(
      "Cannot delete the product as it is part of an active flash deal."
    );
    error.status = 400;
    return next(error);
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
