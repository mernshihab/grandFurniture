const mongoose = require("mongoose");
const FlashDeal = require("./flashDealModel");

const productSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    subCategory: { type: mongoose.Types.ObjectId, ref: "SubCategory" },
    subSubCategory: { type: mongoose.Types.ObjectId, ref: "SubSubCategory" },
    brand: { type: String },
    description: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    totalStock: { type: Number, required: true },
    isVariant: { type: Boolean, default: false },
    variant: [
      {
        attribute: { type: String, required: true },
        color: { type: String },
        colorCode: { type: String },
        style: { type: String },
        size: { type: String },
        stock: { type: Number },
        price: { type: Number },
        image: { type: String },
      },
    ],
    rating: { type: Number, default: 0 },
    reviewer: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
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
