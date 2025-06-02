const express = require("express");
const apiRouter = require("./api/services.js");
const expRouter = require("./api/expenses/expenses.router.js");
const randomFactRouter = require("./api/random-fact/randomfact-route.js");
const app = express();

app.use(express.json());
app.use("/expenses", expRouter);
app.use("/random-facts", randomFactRouter);
app.get("/", (req, res) => {
  res.send("ravi main");
});

app.listen(3006, () => {
  console.log("server running http://localhost:3006");
});
