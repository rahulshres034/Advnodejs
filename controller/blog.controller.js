const { blogs } = require("../model");
const fs = require("fs");
const path = require("path");

exports.createBlog = async (req, res) => {
  const { title, subtitle, description } = req.body;
  const fileName = req.file.filename;

  if (!title || !subtitle || !description || !req.file) {
    return res.status(400).json({
      message: "Please provide details",
    });
  }

  const newBlog = await blogs.create({
    title,
    subtitle,
    description,
    image: process.env.PROJECT_URL + fileName,
    userId: req.userId, // must be passed during blog creation
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

exports.editBlog = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, description } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Please provide a valid blog ID" });
  }

  try {
    const oldData = await blogs.findOne({ where: { id } });

    if (!oldData) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let fileUrl = oldData.image;

    // If a new image is uploaded
    if (req.file) {
      fileUrl = process.env.PROJECT_URL + req.file.filename;

      // Delete the old image file
      const oldImagePath = oldData.image;
      const fileNameUploadFolder = oldImagePath.replace(
        process.env.PROJECT_URL,
        ""
      );
      const fullPath = path.join("uploads", fileNameUploadFolder);

      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        } else {
          console.log("Old image deleted successfully");
        }
      });
    }

    await blogs.update(
      {
        title,
        subtitle,
        description,
        image: fileUrl,
      },
      {
        where: { id },
      }
    );

    const updatedBlog = await blogs.findOne({ where: { id } });

    return res.status(200).json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({
      message: "An error occurred while updating the blog",
      error: error.message,
    });
  }
};
