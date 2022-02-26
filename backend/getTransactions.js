const https = require("https");
const { retrieveAmountFromInputData } = require("./translateInputData");
const { checkCurrency } = require("./currencies");

async function getTransactions(userAddress) {
  let url = `https://testnet.bscscan.com/api?module=account&action=tokentx&address=${userAddress}&startblock=0&endblock=99999999&offset=10&sort=asc`;
  let data = [];

  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          try {
            let json = JSON.parse(body);
            for (let i = 1; i < 5; i++) {
              var userStatus = "";
              var currency = "";
              var flow = "";
              try {
                const amount = retrieveAmountFromInputData(
                  json.result[json.result.length - i].input
                );
                let sender = json.result[json.result.length - i].from;
                if (sender.toLowerCase() != userAddress.toLowerCase()) {
                  userStatus = "received";
                } else {
                  userStatus = "sent";
                }
                let contractAddress =
                  json.result[json.result.length - i].contractAddress;
                currency = checkCurrency(contractAddress);
                if (userStatus == "received") {
                  let moneyFlow = json.result[json.result.length - i].from;
                  flow = `from ${moneyFlow}`;
                } else if (userStatus == "sent") {
                  let moneyFlow = json.result[json.result.length - i].from;
                  flow = `to ${moneyFlow}`;
                }
                let txHash =
                  json.result[json.result.length - i].contractAddress;
                data.push({
                  amount: amount,
                  type: userStatus,
                  currency: currency,
                  flow: flow,
                  txHash: txHash,
                });
              } catch (error) {
                continue;
              }
            }
          } catch (error) {
            console.error(error.message);
          }

          resolve(data);
        });
      })
      .on("error", (error) => {
        console.error(error.message);
      });
  });
}

module.exports = {
  getTransactions,
};
