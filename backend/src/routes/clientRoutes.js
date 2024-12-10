const router = require("express").Router();
const multer = require("multer");
const { add, getAll, destroy } = require("../controllers/clientController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/clients");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("logo");

router.post("/add", upload, add);
router.get("/all", getAll);
router.delete("/delete/:id", destroy);

module.exports = router;