const express = require("express");
const app = express();
require("dotenv").config();
const { calcDRMBPrice, calcDSGDPrice } = require("./priceRetrieval");
const { getDRMBBalance, getDSGDBalance } = require("./getBalance");
const { getTransactions } = require("./getTransactions");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/retrievePrice/drmb", async (req, res) => {
  let DRMBPrice = await calcDRMBPrice();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ drmbPrice: DRMBPrice }));
});

app.get("/retrievePrice/dsgd", async (req, res) => {
  let DSGDPrice = await calcDSGDPrice();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ dsgdPrice: DSGDPrice }));
});

app.get("/getBalance/drmb", async (req, res) => {
  let balance = await getDRMBBalance();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ balance: balance }));
});

app.get("/getBalance/dsgd", async (req, res) => {
  let balance = await getDSGDBalance();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ balance: balance }));
});

app.post("/getTransactions", async (req, res) => {
  const userAddress = req.body.userAddress;
  if (userAddress === undefined) {
    res.sendStatus(400).end();
  }
  let transactionData = await getTransactions(userAddress);
  res.end(JSON.stringify({ transactions: transactionData }));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.debug(`Express is running on port ${port}.`);
});
