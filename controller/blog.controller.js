const { blogs } = require("../model");

exports.createBlog = async (req, res) => {
  const { title, subtitle, description } = req.body;
  if (!title || !subtitle || !description) {
    return res.status(400).json({
      message: "Please provide details",
    });
  }

  const newBlog = await blogs.create({
    title,
    subtitle,
    description,
  });

  return res.status(201).json({
    message: "Blog Created Successfully",
    data: newBlog,
  });
};

exports.getSingleBlog = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  const singleBlog = await blogs.findAll({
    where: {
      id: id,
    },
  });

  if (singleBlog.length == 0) {
    return res.status(500).json({
      message: "No blogs found of that id",
    });
  }

  return res.status(200).json({
    message: "Single Blog Fetched",
    data: singleBlog,
  });
};

exports.getAllBlog = async (req, res) => {
  const allBlogs = await blogs.findAll();
  return res.status(200).json({
    message: "all blogs",
    data: allBlogs,
  });
};
