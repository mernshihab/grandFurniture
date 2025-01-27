const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  add,
  getAll,
  getSingle,
  update,
  destroy,
} = require("../controllers/featureController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/features");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Routes
router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/add", upload.single("image"), add);
router.patch("/update/:id", upload.single("image"), update);
router.delete("/delete/:id", destroy);

module.exports = router;