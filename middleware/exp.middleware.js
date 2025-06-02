module.exports = (req, res, next) => {
  const key = req.headers["key"];
  if (key !== "andria") {
    return res.status(400).json({ error: "key is not correct" });
  }
  next();
};
