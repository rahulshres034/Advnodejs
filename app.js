const express = require("express");
const app = express();

const authRoute = require("./routes/auth.route");
app.use(express.json());

app.use("/api/auth", authRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Starting on ${PORT}`);
});
