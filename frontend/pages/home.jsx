const Home = () => {
  const recentTransactions = [
    { amount: "SGD 1234.00", type: "receive", person: "XYZ" },
    { amount: "SGD 96.24", type: "send", person: "Someone" },
    { amount: "SGD 65.50", type: "send", person: "ABC" },
  ];

  return (
    <main className="grid grid-cols-5 p-10 gap-y-10 gap-x-20 bg-[#216de2] min-h-screen h-fit">
      <section className="col-span-3 p-10 space-y-5 bg-white shadow-lg h-[50vh] rounded-xl">
        <h1 className="text-3xl font-bold">Total Asset Balance</h1>
      </section>
      <section className="col-span-2 p-10 space-y-5 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold">Transfer money</h1>
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

      <section className="col-span-3 p-10 space-y-5 bg-white shadow-lg h-fit rounded-xl">
        <h1 className="text-3xl font-bold">Recent Transactions</h1>
        <div className="p-5 divide-y-2 divide-gray-200">
          {recentTransactions.map((transaction) => (
            <p className="py-2 text-gray-400 font-xl" key={transaction.amount}>
              <span className="font-bold text-black">{transaction.amount}</span>{" "}
              {transaction.type === "receive" ? "from" : "to"}{" "}
              {transaction.person}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
