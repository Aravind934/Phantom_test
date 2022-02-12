const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, fille, cb) => cb(null, "./public"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({
  storage,
}).single('file')

router.post("/", (req, res) => {
  try {
    let status = 200,
      message = "uploaded!";
    upload(req, res, (err) => {
      if (err) (status = 400), (message = err.message);
      res.json({
        status,
        message,
      });
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
});

module.exports = router;
