async function getTransactions(apiURL, userAddress) {
  let transactions = [];

  await fetch(apiURL + "/getTransactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userAddress: userAddress,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return transactions.concat(data.transactions);
    });
}

async function getDRMBBalance(apiURL, userAddress) {
  await fetch(apiURL + `/getBalance/drmb`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userAddress: userAddress,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return { amount: data.balance, currency: "RMB" };
    });
}

async function getDSGDBalance(apiURL, userAddress) {
  await fetch(apiURL + "/getBalance/dsgd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userAddress: userAddress,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return { amount: data.balance, currency: "SGD" };
    });
}

async function getTotalAssetBalance(apiURL, userAddress) {
  let totalAssetBalance = [];

  const drmbBalance = await getDRMBBalance(apiURL, userAddress);
  const dsgdBalance = await getDSGDBalance(apiURL, userAddress);

  console.debug(drmbBalance, dsgdBalance);
}

module.exports = {
  getTransactions,
  getTotalAssetBalance,
};
