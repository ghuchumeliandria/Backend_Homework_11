const { Router } = require("express");

const {
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpenseById,
} = require("../services");

const expMiddleware = require("../../middleware/exp.middleware");
const { upload } = require("../../config/cloudinary.config");
const { ReadFile, WriteFile } = require("../../utils");

const expRouter = Router();

expRouter.get("/", getExpenses);
expRouter.get("/:id", getExpenseById);

expRouter.post("/", upload.single("avatar"), async (req, res) => {
  const expenses = await ReadFile("expenses.json", true);
  const { name, expense, age } = req.body;

  if (!name || !expense || !age)
    return res.status(400).json({ error: "invalid credentials" });

  const lastId = expenses[expenses.length - 1]?.id || 0;

  const newExpenses = {
    id: lastId + 1,
    name,
    expense,
    age,
    avatar: req.file.path,
  };

  expenses.push(newExpenses);
  await WriteFile("expenses.json", JSON.stringify(expenses));
  res.status(201).json({ message: "post created successfully" });
});

expRouter.delete("/:id", deleteExpense);
expRouter.put("/:id", updateExpense);

module.exports = expRouter;
