import {
  TrendUp,
  Receipt,
  ArrowsClockwise,
  ArrowCircleDown,
  ArrowCircleUp,
} from "phosphor-react";
import Layout from "../components/Layout";

const Wallet = ({ transactions, conversionRates }) => {
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
            ></input>
            <select className="border border-gray-300 rounded-lg">
              <option value="USD">USD</option>
              <option value="RMB">RMB</option>
              <option value="SGD">SGD</option>
            </select>
          </div>
          <input
            className="w-full h-12 px-5 border border-gray-300 rounded-lg"
            placeholder="Send to?"
          ></input>
          <button className="bg-[#216de2] h-12 w-full rounded-lg hover:bg-[#1850a5] text-white font-bold">
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
