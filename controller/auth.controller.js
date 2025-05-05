const { users } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await users.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User created successfully",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email & password",
    });
  }
  const user = await users.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  //   Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }

  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });

  return res.status(200).json({
    message: "Login Successful",
    token,
  });
};
