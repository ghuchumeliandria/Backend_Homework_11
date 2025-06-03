const express = require("express");
const expRouter = require("./api/expenses/expenses.router.js");
const randomFactRouter = require("./api/random-fact/randomfact-route.js");
const uploadRouter = require("./api/upload/upload.route.js");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/expenses", expRouter);
app.use("/random-facts", randomFactRouter);
app.use("/upload", uploadRouter);
app.get("/", (req, res) => {
  res.send("ravi main");
});

app.listen(3006, () => {
  console.log("server running http://localhost:3006");
});
