const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { users } = require("../model");

exports.isAuth = async (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(400).json({
      message: "No token Found",
    });
  }
  const decryptedToken = await promisify(jwt.verify)(token, process.env.SECRET);
  const data = await users.findByPk(decryptedToken.id);
  if (!data) {
    return res.status(500).json({
      message: "No user belog to that id",
    });
  }
  req.userId = decryptedToken.id;

  next();
};
