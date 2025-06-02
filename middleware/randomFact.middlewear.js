module.exports = (req, res, next) => {
  const randomNum = Math.random();
  if (randomNum < 0.3) {
    return res.send("daibloka");
  }
  next();
};
