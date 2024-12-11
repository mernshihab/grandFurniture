const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAboutUs,
  updateAboutUs,
  createAboutUs,
} = require("../controllers/aboutControllers");
const verifyAdmin = require("../middleware/verifyAdmin");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/aboutus");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.patch(
  "/update-about/:id",
  verifyAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "featureProductImages", maxCount: 10 },
  ]),
  updateAboutUs
);

router.get("/", getAboutUs);

router.post(
  "/add-about",
  verifyAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "featureProductImages", maxCount: 10 },
  ]),
  createAboutUs
);

module.exports = router;
