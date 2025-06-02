const { Router } = require("express");
const { randomFacts } = require("../services.js");
const randomFactMiddlewear = require("../../middleware/randomFact.middlewear.js");

const randomFactRouter = Router();
randomFactRouter.get("/", randomFactMiddlewear, randomFacts);

module.exports = randomFactRouter;
