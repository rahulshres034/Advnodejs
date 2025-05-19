const { blogs } = require("../model");

exports.isValid = async (req, res, next) => {
  const userId = req.userId;
  const id = req.params.id;

  try {
    const blog = await blogs.findOne({ where: { id } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.userId !== userId) {
      return res.status(403).json({ message: "You cannot edit this blog" });
    }

    next();
  } catch (err) {
    console.error("Validation Error:", err);
    return res
      .status(500)
      .json({ message: "Server Error in isValid middleware" });
  }
};
