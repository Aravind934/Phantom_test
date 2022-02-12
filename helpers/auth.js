const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  try {
    let res = await jwt.verify(token, process.env.JWT_KEY);
    if (res) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const auth = async (req, res, next) => {
  const { token } = req.body;
  let isVerified = await verifyToken(token);
  if (!isVerified) {
    return res.json({
      status: 401,
      message: "Please login",
    });
  }
  next();
};

module.exports = {
  verifyToken,
  auth,
};
