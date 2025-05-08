const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth.route");
app.use(express.json());
app.use(cookieParser()); // Required to parse cookies

app.use("/api/auth", authRoute);

const PORT = 5000;
app.listen(process.env.PORT, () => {
  console.log(`Starting on ${PORT}`);
});
