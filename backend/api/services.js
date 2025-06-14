const { deleteFromCloudinary } = require("../config/cloudinary.config");
const { ReadFile, WriteFile } = require("../utils");

const getExpenses = async (req, res) => {
  const expenses = await ReadFile("expenses.json", true);

  res.json(expenses);
};

const getExpenseById = async (req, res) => {
  const expenses = await ReadFile("expenses.json", true);
  const id = Number(req.params.id);
  const user = expenses.find((el) => el.id === id);

  res.json(user);
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);

  const expenses = await ReadFile("expenses.json", true);
  const index = expenses.findIndex((el) => el.id === id);

  if (index === -1)
    return res.status(400).json({ error: "expense not found", id });
  const filename = expenses[index].avatar.split("uploads/")[1];
  const fileId = filename.split(".")[0];
  const publicField = `uploads/${fileId}`;
  await deleteFromCloudinary(publicField);
  const deletedPost = expenses.splice(index, 1);
  await WriteFile("expenses.json", JSON.stringify(expenses));
  res
    .status(200)
    .json({ message: "expense deleted successfully", expense: deletedPost });
};

const updateExpense = async (req, res) => {
  const id = Number(req.params.id);

  const expenses = await ReadFile("expenses.json", true);
  const index = expenses.findIndex((el) => el.id === id);

  const { name, expense, age } = req.body;
  if (index === -1)
    return res.status(400).json({ error: "expense not found", id });

  const updateReq = {
    name,
    expense,
    age,
  };

  expenses[index] = {
    ...expenses[index],
    ...updateReq,
  };
  await WriteFile("expenses.json", JSON.stringify(expenses));
  res.json({ message: "expense updated successfully", updateReq });
};

const georgianDriftFacts = [
  "საქართველოს დრიფტის სერია (GDS) დაფუძნდა 2013 წელს და გახდა რეგიონში ერთ-ერთი ყველაზე აქტიური მოტორსპორტი.",
  "პირველი ოფიციალური GDS შეჯიბრი გაიმართა რუსთავის ავტოდრომზე.",
  "დრიფტინგის პოპულარობა საქართველოში სწრაფად გაიზარდა და ბევრი ახალგაზრდა მძღოლი საერთაშორისო შეჯიბრებშიც იღებს მონაწილეობას.",
  "ქართველი დრიფტერები ხშირად მონაწილეობენ ევროპულ დრიფტის ჩემპიონატებში, განსაკუთრებით Drift Kings-ში.",
  "2023 წელს GDS ჩემპიონატში 20-ზე მეტი პროფესიონალი დრიფტ მძღოლი მონაწილეობდა.",
  "საქართველოს დრიფტის სერიაში გამოიყენება როგორც ადგილობრივი, ისე იმპორტირებული მოდიფიცირებული მანქანები — განსაკუთრებით Nissan Silvia და BMW E36/E46 მოდელები.",
  "GDS შეჯიბრებებზე ჟიურის შეფასება ეფუძნება კუთხეს, სიჩქარეს, ხაზს და შთაბეჭდილებას.",
  "დრიფტის ტრეკები ხშირად ირგვლივ შემოღობილია უსაფრთხოების ბარიერებით, რათა მინიმუმამდე შემცირდეს ავარიის რისკი.",
  "საქართველოს დრიფტის სერიამ ხელი შეუწყო ავტომოყვარულების გაერთიანებას და ბევრმა მექანიკოსმა და ტუნინგის სპეციალისტმა აქ იპოვა თავისი ადგილი.",
  "დრიფტის კულტურა საქართველოში მჭიდროდ უკავშირდება ავტომოყვარულთა საზოგადოებას, რომელიც ხშირად სოციალური მედიის საშუალებით ავითარებს მოვლენებს და ორგანიზებას უწევს შეხვედრებს.",
];

const randomFacts = (req, res) => {
  const randomFact = Math.floor(Math.random() * georgianDriftFacts.length);

  res.send(georgianDriftFacts[randomFact]);
};

module.exports = {
  getExpenses,

  deleteExpense,
  updateExpense,
  randomFacts,
  getExpenseById,
};
