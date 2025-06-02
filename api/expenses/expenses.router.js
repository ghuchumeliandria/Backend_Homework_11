const { Router } = require("express");
const {
  getExpenses,
  addExpenses,
  deleteExpense,
  updateExpense,
} = require("../services");
const { checkHeaderKey } = require("../../middleware/exp.middleware");
const expMiddleware = require("../../middleware/exp.middleware");
const createExpMiddlewear = require("../../middleware/createExp.middlewear");

const expRouter = Router();

expRouter.get("/", getExpenses);
expRouter.post("/", createExpMiddlewear, addExpenses);
expRouter.delete("/:id", expMiddleware, deleteExpense);
expRouter.put("/:id", updateExpense);

module.exports = expRouter;
