const {
  createBlog,
  getSingleBlog,
  getAllBlog,
  editBlog,
} = require("../controller/blog.controller");
const { isAuth } = require("../middleware/isAuth.middleware");
const { isValid } = require("../middleware/isValid.middleware");

const { multer, storage } = require("../middleware/multerConfig");
const upload = multer({ storage: storage });

const router = require("express").Router();

router.route("/createBlog").post(isAuth, upload.single("image"), createBlog);
router.route("/getSingleBlog/:id").get(getSingleBlog);
router
  .route("/editBlog/:id")
  .post(isAuth, isValid, upload.single("image"), editBlog);
router.route("/getAllBlog").get(getAllBlog);

module.exports = router;
