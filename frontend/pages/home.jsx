import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Filler, Legend, Tooltip } from "chart.js";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  ChartPie,
  Receipt,
  PaperPlaneTilt,
} from "phosphor-react";
import { useState } from "react";

import Layout from "../components/Layout";

Chart.register(ArcElement, Filler, Legend, Tooltip);

const Home = ({ recentTransactions, totalAssetBalance }) => {
  const [toField, setToField] = useState("");
  const [valueField, setValueField] = useState("");
  const [currencyOption, setCurrencyOption] = useState("");
  const Web3 = require("web3");
  const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
  const sendTransaction = () => {
    let destination = document.querySelector("#sendField").value;
    let amountToSend = document.querySelector("#amountField").value;
    let currencySelected = document.querySelector("#currencyField").value;
    if (currencySelected == "USD") {
      var tokenAddress = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7";
    }
    if (currencySelected == "SGD") {
      var tokenAddress = "0x25d1d454084Df3B23B0C982bc2E4CC2Dd06a7F12";
    }
    if (currencySelected == "RMB") {
      var tokenAddress = "0x54ec93A799ea75c2ED8685d6310f5bF0c37c1bE4";
    }
    console.log(destination);
    console.log(amountToSend);
    console.log(tokenAddress);
    console.log(currencySelected);
    var uintToSend = parseFloat(amountToSend) * 1000000000000000000;
    let data = web3.eth.abi.encodeParameters(
      ["address", "uint256"],
      [`${destination}`, `${uintToSend}`]
    );

    const transactionParameters = {
      to: tokenAddress, // Required except during contract publications.
      from: ethereum.selectedAddress, // must match user's active address.
      value: "0x00", // Only required to send ether to the recipient from the initiating external account.
      data: "0xa9059cbb" + data.slice(data.length + "0xa9059cbb".length - 138), // Optional, but used for defining smart contract creation and interaction.
      chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
  };

  const labels = [];
  const amounts = [];
  for (const currency of totalAssetBalance) {
    labels.push(currency.currency);
    amounts.push(currency.amount);
  }

  return (
    <Layout>
      <main className="grid min-h-screen grid-cols-3 gap-10 p-10 pt-40 h-fit">
        <section className="col-span-2 p-10 space-y-5 bg-white shadow-lg rounded-xl">
          <span className="flex flex-row items-center space-x-2">
            <ChartPie className="text-3xl" weight="bold" />
            <h1 className="text-3xl font-bold">Total Asset Balance</h1>
          </span>
          <Doughnut
            className="w-full max-h-96"
            data={{
              labels: labels,
              datasets: [
                {
                  label: "",
                  data: amounts,
                  backgroundColor: ["#216de2", "#1850a5"],
                },
              ],
            }}
          />
        </section>

        <section className="row-span-2 p-10 space-y-5 bg-white shadow-lg rounded-xl place-content-center">
          <span className="flex flex-row items-center space-x-2">
            <PaperPlaneTilt className="text-3xl" weight="bold" />
            <h1 className="text-3xl font-bold ">Transfer Money</h1>
          </span>
          <div className="flex flex-row space-x-2">
            <input
              id="amountField"
              className="w-full h-12 px-5 border border-gray-300 rounded-lg"
              placeholder="Send amount?"
              onClick={(event) => setValueField(event.target.value)}
            ></input>
            <select
              className="border border-gray-300 rounded-lg"
              id="currencyField"
            >
              <option value="USD">USD</option>
              <option value="RMB">RMB</option>
              <option value="SGD">SGD</option>
              onClick={(event) => setCurrencyOption(event.target.value)}
            </select>
          </div>
          <input
            id="sendField"
            className="w-full h-12 px-5 border border-gray-300 rounded-lg"
            placeholder="Send to?"
            onClick={(event) => setToField(event.target.value)}
          ></input>
          <button
            className="bg-[#216de2] h-12 w-full rounded-lg hover:bg-[#1850a5] text-white font-bold"
            onClick={() => sendTransaction()}
          >
            Confirm
          </button>
        </section>

        <section className="col-span-2 p-10 space-y-5 bg-white shadow-lg h-fit rounded-xl">
          <span className="flex flex-row items-center space-x-2">
            <Receipt className="text-3xl" weight="bold" />
            <h1 className="text-3xl font-bold">Recent Transactions</h1>
          </span>
          <div className="divide-y-2 divide-gray-200">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.amount}
                className="flex items-center py-2 space-x-2 text-xl"
              >
                {transaction.type === "received" ? (
                  <ArrowCircleDown className="text-green-500" />
                ) : (
                  <ArrowCircleUp className="text-red-500" />
                )}
                <p className="text-gray-400">
                  <span className="font-bold text-black">
                    {transaction.currency} {transaction.amount}
                  </span>{" "}
                  {transaction.flow}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const apiURL = process.env.API_URL;
  let recentTransactions = [];
  let totalAssetBalance = [];

  await fetch(apiURL + "/getTransactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userAddress: "0xd3999C07e2c09BDecC7c245E68cDF5a726c88863",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      recentTransactions = recentTransactions.concat(data.transactions);
    });

  await fetch(apiURL + `/getBalance/drmb`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userAddress: "0xd3999C07e2c09BDecC7c245E68cDF5a726c88863",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      totalAssetBalance.push({ amount: data.balance, currency: "RMB" });
    });

  await fetch(apiURL + "/getBalance/dsgd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // TODO: Add custom user address
    body: JSON.stringify({
      userAddress: "0xd3999C07e2c09BDecC7c245E68cDF5a726c88863",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      totalAssetBalance.push({ amount: data.balance, currency: "SGD" });
    });

  return {
    props: {
      recentTransactions,
      totalAssetBalance,
    },
  };
}

export default Home;
