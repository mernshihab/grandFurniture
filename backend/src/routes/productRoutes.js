const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const {
  addProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  deleteProductById,
  updateProduct,
  getFeaturedProducts,
  updateFeatured,
} = require("../controllers/productController");

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./uploads/products";
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`
    );
  },
});

const upload = multer({ storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "variantPhotos", maxCount: 10 },
]);

// Routes
router.post("/add-product", upload, addProduct);
router.get("/all-products", getAllProducts);
router.get("/featured-products", getFeaturedProducts);
router.get("/getbyslug/:slug", getProductBySlug);
router.get("/:id", getProductById);
router.patch("/update-product/:id", upload, updateProduct);
router.delete("/delete/:id", deleteProductById);
router.put("/update/feature/:id", updateFeatured);

module.exports = router;
