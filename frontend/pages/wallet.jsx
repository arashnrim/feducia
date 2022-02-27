import {
  TrendUp,
  Receipt,
  ArrowsClockwise,
  ArrowCircleDown,
  ArrowCircleUp,
} from "phosphor-react";
import Layout from "../components/Layout";
import { useState } from "react";

const Wallet = ({ transactions, conversionRates }) => {
  const [exchangedValue, setExchangedValue] = useState("");

  const tradeTokenforToken = () => {
    const Web3 = require("web3");
    const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
    let exchangingAmount = document.querySelector("#inputField").value;
    var exchangeAmount = parseFloat(exchangingAmount) * 1000000000000000000;
    console.log(exchangeAmount);
    let data = web3.eth.abi.encodeParameters(
      ["uint256", "uint256", "address[]", "address", "uint256"],
      [
        `${exchangeAmount}`,
        "0000000000000000000",
        [
          "0x25d1d454084Df3B23B0C982bc2E4CC2Dd06a7F12",
          "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
          "0x54ec93A799ea75c2ED8685d6310f5bF0c37c1bE4",
        ],
        "0xd3999C07e2c09BDecC7c245E68cDF5a726c88863",
        "0000000000000000000",
      ]
    );
    console.log(
      "0x38ed1739" + data.slice(data.length + "0xa9059cbb".length - 586)
    );
    const transactionParameters = {
      to: "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3", // Required except during contract publications.
      from: ethereum.selectedAddress, // must match user's active address.
      value: "0x00", // Only required to send ether to the recipient from the initiating external account.
      data: "0x38ed1739" + data.slice(data.length + "0xa9059cbb".length - 586), // Optional, but used for defining smart contract creation and interaction.
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

  const updateExchangeRateConverting = (event) => {
    let exchangingCurrency = document.querySelector("#convertedCurrency").value;
    let startCurrency = document.querySelector("#startingCurrency").value;
    if (exchangingCurrency == "RMB") {
      const dsgdPrice = conversionRates.filter((obj) => {
        return obj.currency === "DSGD";
      })[0].info.value;
      const drmbPrice = conversionRates.filter((obj) => {
        return obj.currency === "DRMB";
      })[0].info.value;
      if (startCurrency == "SGD") {
        setExchangedValue(event.target.value * (dsgdPrice / drmbPrice));
      } else if (startCurrency == "USD") {
        setExchangedValue(event.target.value * (1 / drmbPrice));
      } else {
        setExchangedValue(event.target.value);
      }
    } else if (exchangingCurrency == "SGD") {
      const dsgdPrice = conversionRates.filter((obj) => {
        return obj.currency === "DSGD";
      })[0].info.value;
      const drmbPrice = conversionRates.filter((obj) => {
        return obj.currency === "DRMB";
      })[0].info.value;
      if (startCurrency == "RMB") {
        setExchangedValue(event.target.value * (drmbPrice / dsgdPrice));
      } else if (startCurrency == "USD") {
        setExchangedValue(event.target.value * (dsgdPrice / 1));
      } else {
        setExchangedValue(event.target.value);
      }
    } else if (exchangingCurrency == "USD") {
      const dsgdPrice = conversionRates.filter((obj) => {
        return obj.currency === "DSGD";
      })[0].info.value;
      const drmbPrice = conversionRates.filter((obj) => {
        return obj.currency === "DRMB";
      })[0].info.value;
      if (startCurrency == "SGD") {
        setExchangedValue(event.target.value * (1 / dsgdPrice));
      } else if (startCurrency == "RMB") {
        setExchangedValue(event.target.value * (1 / drmbprice));
      } else {
        setExchangedValue(event.target.value);
      }
    }
  };

  return (
    <Layout>
      <main className="grid min-h-screen grid-cols-3 gap-10 p-10 pt-40 h-fit">
        <section className="col-span-2 p-10 space-y-5 bg-white shadow-lg rounded-xl">
          <span className="flex flex-row items-center space-x-2">
            <TrendUp className="text-3xl" weight="bold" />
            <h1 className="text-3xl font-bold">Live Exchange Rates</h1>
          </span>
          <div className="grid grid-cols-3 gap-5">
            {conversionRates.map((rate) => {
              return (
                <div
                  className="flex flex-col items-center h-full col-span-1 py-5 text-xl shadow rounded-xl"
                  key={rate.currency}
                >
                  <p className="font-bold">{rate.currency} 1.00</p>
                  <p>↓</p>
                  <p className="font-bold">
                    {rate.info.relative}{" "}
                    {parseFloat(
                      rate.info.value /
                        conversionRates.filter((obj) => {
                          return obj.currency === rate.info.relative;
                        })[0].info.value
                    ).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="row-span-2 p-10 space-y-5 bg-white shadow-lg rounded-xl">
          <span className="flex flex-row items-center space-x-2">
            <ArrowsClockwise className="text-3xl" weight="bold" />
            <h1 className="text-3xl font-bold">Convert Money</h1>
          </span>
          <div className="flex flex-row space-x-2">
            <input
              className="w-full h-12 px-5 border border-gray-300 rounded-lg"
              placeholder="Send amount?"
              id="inputField"
              onKeyDown={(event) => updateExchangeRateConverting(event)}
              onKeyUp={(event) => updateExchangeRateConverting(event)}
            ></input>
            <select
              className="border border-gray-300 rounded-lg"
              id="startingCurrency"
            >
              <option value="USD">USD</option>
              <option value="RMB">RMB</option>
              <option value="SGD">SGD</option>
            </select>
          </div>
          <div className="flex flex-row space-x-2">
            <input
              className="w-full h-12 px-5 border border-gray-300 rounded-lg"
              value={exchangedValue}
              disabled={true}
              id="convertedField"
            ></input>
            <select
              className="border border-gray-300 rounded-lg"
              id="convertedCurrency"
            >
              <option value="USD">USD</option>
              <option value="RMB">RMB</option>
              <option value="SGD">SGD</option>
            </select>
          </div>
          <button
            className="bg-[#216de2] h-12 w-full rounded-lg hover:bg-[#1850a5] text-white font-bold"
            onClick={() => tradeTokenforToken()}
          >
            Confirm
          </button>
        </section>

        <section className="col-span-2 p-10 space-y-5 bg-white shadow-lg h-fit rounded-xl">
          <span className="flex flex-row items-center space-x-2">
            <Receipt className="text-3xl" weight="bold" />
            <h1 className="text-3xl font-bold">All Transactions</h1>
          </span>
          <div className="divide-y-2 divide-gray-200">
            {transactions.map((transaction) => (
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
  let transactions = [];
  const conversionRates = [];

  await fetch(apiURL + "/retrievePrice/drmb")
    .then((response) => response.json())
    .then((data) =>
      conversionRates.push({
        currency: "DRMB",
        info: {
          value: data.drmbPrice,
          relative: "DSGD",
        },
      })
    );

  await fetch(apiURL + "/retrievePrice/dsgd")
    .then((response) => response.json())
    .then((data) => {
      conversionRates.push({
        currency: "DSGD",
        info: {
          value: data.dsgdPrice,
          relative: "DRMB",
        },
      });
    });

  await fetch(apiURL + "/getTransactions", {
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
      transactions = transactions.concat(data.transactions);
    });

  return {
    props: {
      transactions,
      conversionRates,
    },
  };
}

export default Wallet;
