require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { auth } = require("./helpers/auth");

//routes path
const fileRoute = require("./fileSystem");
const fileUploadRoute = require("./fileUpload");
const paymentGatewayRoute = require("./razorpay");

//middleware setup

app.use(express.json());
app.use(express.static("./public"));

//routes

app.use("/file", fileRoute);
app.use("/upload", fileUploadRoute);
app.use("/payment", auth, paymentGatewayRoute);

//sigin

app.post("/signIn", async (req, res) => {
  try {
    let { username, email } = req.body,
      token;
    token = await jwt.sign({ username, email }, process.env.JWT_KEY);
    res.json({
      status: 200,
      message: "Success!",
      token,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 8000;

//port
app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
