const { Router } = require("express");
const { upload } = require("../../config/cloudinary.config");

const uploadRouter = Router();

uploadRouter.post("/", upload.single("image"), (req, res) => {
  res.status(201).json({
    message: "uploaded successfylly",
    url: req.file.path,
  });
});

module.exports = uploadRouter