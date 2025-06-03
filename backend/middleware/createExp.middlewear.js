module.exports = (req, res, next) => {
  // const { name, expense, age } = req.body;
  console.log(name);

  if (!name || !expense || !age)
    return res.status(400).json({ error: "invalid credentials" });
  next();
};
