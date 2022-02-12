const router = require("express").Router();
const fs = require("fs");

router.post("/writeFile", (req, res) => {
  try {
    let { fileName, extension, content } = req.body,
      status = 200,
      message = "done!";
    extension = extension.replace(/\W/g, "");
    fs.writeFile(`${fileName}.${extension}`, content, (err) => {
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

router.get("/readFile", (req, res) => {
  try {
    let { fileName } = req.body,
      status = 200,
      data = null,
      message = null;
    fs.readFile(fileName, "utf8", (err, content) => {
      if (err) (status = 400), (message = err.message);
      data = JSON.stringify(content);
      res.json({
        status,
        message,
        data,
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
