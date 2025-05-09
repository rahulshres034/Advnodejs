const {
  createBlog,
  getSingleBlog,
  getAllBlog,
} = require("../controller/blog.controller");
const { isAuth } = require("../middleware/isAuth.middleware");

const router = require("express").Router();

router.route("/createBlog").post(isAuth, createBlog);
router.route("/getSingleBlog/:id").get(getSingleBlog);
router.route("/getAllBlog").get(getAllBlog);

module.exports = router;
