const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Logic to validate file type
    const allowedFileType = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedFileType.includes(file.mimetype)) {
      cb(new Error("Invalid Filetype"));
      return;
    }
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-", file.originalname);
  },
});

module.exports = {
  multer,
  storage,
};
