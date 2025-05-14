const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth.route");
const blogRoute = require("./routes/blog.route");
app.use(express.json());
app.use(cookieParser()); // Required to parse cookies

app.use(express.static("uploads/"));
app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);

app.use((req, res, next) => {
  res.locals.currentUser = req.cookies.token;
});

const PORT = 5000;
app.listen(process.env.PORT, () => {
  console.log(`Starting on ${PORT}`);
});
