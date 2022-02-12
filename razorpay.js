const router = require("express").Router();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const { auth } = require("./helpers/auth");

const instance = new Razorpay({
  key_id: process.env.RAZOR_CLIENT,
  key_secret: process.env.RAZOR_SECRET,
});

router.post("/createOrder", async (req, res) => {
  const { amount } = req.body;
  try {
    let order = await instance.orders.create({
      amount: (amount * 100).toString(),
      currency: "INR",
      receipt: shortid.generate(),
    });
    res.json({
      status: 200,
      result: order,
    });
  } catch (error) {
    res.json({
      status: 400,
      error: error.message,
    });
  }
});

router.get("/jj", auth, (req, res) => {
  res.json({
    status: 200,
  });
});

module.exports = router;
