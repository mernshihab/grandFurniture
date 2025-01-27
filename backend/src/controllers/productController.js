const Product = require("../models/productModel");
const Categories = require("../models/categoriesModel");
const SubCategory = require("../models/subCategoryModel");
const SubSubCategory = require("../models/subSubCategoryModel");
const Brand = require("../models/brandModel");
const slugify = require("slugify");
const fs = require("fs");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

// Helper function to delete a file
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Error deleting file: ${filePath}`, err);
  });
};

exports.addProduct = async (req, res) => {
  const thumbnail = req?.files?.thumbnail?.[0]?.filename;
  const variantPhotos = req?.files?.variantPhotos || [];

  if (!thumbnail) {
    return res.status(400).json({
      success: false,
      message: "Please upload a thumbnail",
    });
  }

  const { title } = req.body;

  let product = {
    ...req.body,
    slug: slugify(`${title}-${Date.now()}`),
    thumbnail,
  };

  const variants = req.body.variants ? JSON.parse(req.body.variants) : null;

  if (variants && variants?.length > 0) {
    try {
      const newVariants = variants?.map((variantItem, index) => {
        return {
          ...variantItem,
          image: variantPhotos[index]?.filename || null,
        };
      });

      product.variant = newVariants;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid variant JSON",
        error,
      });
    }
  }

  try {
    const result = await Product.create(product);
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const { category, subCategory, subSubCategory, brand, range, sort, search } =
    req.query;

  try {
    const targetedCategory = await Categories.findOne({
      slug: category && category,
    });
    const targetedSubCategory = await SubCategory.findOne({
      slug: subCategory && subCategory,
    });
    const targetedSubSubCategory = await SubSubCategory.findOne({
      slug: subSubCategory && subSubCategory,
    });
    const targetedBrand = await Brand.findOne({
      slug: brand && brand,
    });

    const categoryId = targetedCategory?._id;
    const subCategoryId = targetedSubCategory?._id;
    const subSubategoryId = targetedSubSubCategory?._id;
    const brandName = targetedBrand?.name;

    let query = {};
    if (category) query.category = categoryId;
    if (subCategory) query.subCategory = subCategoryId;
    if (subSubCategory) query.subSubCategory = subSubategoryId;
    if (brand) query.brand = brandName;

    let sortOption = {};

    if (sort && parseInt(sort) !== 0) {
      sortOption.sellingPrice = parseInt(sort);
    } else {
      sortOption.createdAt = -1;
    }
    const prices = range && JSON.parse(range);
    if (range) query.sellingPrice = { $gte: prices[0], $lte: prices[1] };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOption)
      .populate("category subCategory subSubCategory", "name slug icon");

    const total = await Product.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get a Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category subCategory subSubCategory",
      "name slug icon"
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a Product by Slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category subCategory subSubCategory",
      "name slug icon"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a Product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    await Product.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });

    deleteFile(`./uploads/products/${product?.thumbnail}`);
    if (product?.variant) {
      product?.variant?.map((v) => {
        if (v?.image) {
          deleteFile(`./uploads/products/${v?.image}`);
        }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a Product
exports.updateProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the URL params
  const thumbnail = req?.files?.thumbnail?.[0]?.filename;
  const variantPhotos = req?.files?.variantPhotos || [];

  try {
    // Fetch the existing product from the database
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      title,
      variants,
      category,
      subCategory,
      brand,
      sellingPrice,
      purchasePrice,
      totalStock,
      discount,
      featured,
      desription,
      isVariant,
    } = req.body;

    // Prepare the product update data by copying the existing product
    const productUpdateData = { ...existingProduct.toObject() };

    // Update thumbnail if provided, else keep existing
    if (thumbnail) {
      productUpdateData.thumbnail = thumbnail;
    }

    if (category) {
      const targetedCategory = await Categories.findOne({
        slug: category && category,
      });
      const categoryId = targetedCategory?._id;
      productUpdateData.category = categoryId;
    }

    if (subCategory) {
      const targetedSubCategory = await SubCategory.findOne({
        slug: subCategory && subCategory,
      });
      const subCategoryId = targetedSubCategory?._id;
      productUpdateData.subCategory = subCategoryId;
    }

    if (brand) {
      const targetedBrand = await Brand.findOne({
        slug: brand && brand,
      });
      const brandName = targetedBrand?.name;
      productUpdateData.brand = brandName;
    }

    if (sellingPrice) {
      productUpdateData.sellingPrice = sellingPrice;
    }

    if (purchasePrice) {
      productUpdateData.purchasePrice = purchasePrice;
    }

    if (totalStock) {
      productUpdateData.totalStock = totalStock;
    }

    if (discount) {
      productUpdateData.discount = discount;
    }

    if (featured) {
      productUpdateData.featured = featured;
    }

    if (desription) {
      productUpdateData.desription = desription;
    }

    if (isVariant) {
      productUpdateData.isVariant = isVariant;
    }

    // Update title and slug if the title has changed
    if (title && title !== existingProduct.title) {
      productUpdateData.title = title;
      productUpdateData.slug = slugify(`${title}-${Date.now()}`);
    }

    // Process variants if provided
    if (variants) {
      try {
        const parsedVariants = JSON.parse(variants);

        if (parsedVariants && parsedVariants.length > 0) {
          const updatedVariants = parsedVariants.map((variantItem, index) => {
            return {
              ...variantItem,
              image:
                variantPhotos[index]?.filename ||
                existingProduct.variant[index]?.image,
            };
          });

          productUpdateData.variant = updatedVariants;
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid variant JSON",
          error,
        });
      }
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      productUpdateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure the updated data is valid
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Featured Products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;

    const products = await Product.find({ featured: true })
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category subCategory subSubCategory", "name slug icon");

    return res.status(200).json({
      success: true,
      message: "Featured products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Featured Status
exports.updateFeatured = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { featured: !product.featured },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Featured status updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
