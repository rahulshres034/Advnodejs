const {
  createBlog,
  getSingleBlog,
  getAllBlog,
} = require("../controller/blog.controller");
const { isAuth } = require("../middleware/isAuth.middleware");

const { multer, storage } = require("../middleware/multerConfig");
const upload = multer({ storage: storage });

const router = require("express").Router();

router.route("/createBlog").post(isAuth, upload.single("image"), createBlog);
router.route("/getSingleBlog/:id").get(getSingleBlog);
router.route("/getAllBlog").get(getAllBlog);

module.exports = router;
