const Web3 = require("web3");

let pancakeSwapContract =
  "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3".toLowerCase();
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

const dsgdAddress = "0x25d1d454084Df3B23B0C982bc2E4CC2Dd06a7F12";
const drmbAddress = "0x54ec93A799ea75c2ED8685d6310f5bF0c37c1bE4";
const holderAddress = "0xd3999C07e2c09BDecC7c245E68cDF5a726c88863"; //User wallet address

const abiJson = [
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

async function getDSGDBalance() {
  const contract = new web3.eth.Contract(abiJson, dsgdAddress);
  const balance = await contract.methods.balanceOf(holderAddress).call();
  return balance / 1000000000000000000;
}

async function getDRMBBalance() {
  const contract = new web3.eth.Contract(abiJson, drmbAddress);
  const balance = await contract.methods.balanceOf(holderAddress).call();
  return balance / 1000000000000000000;
}

module.exports = {
  getDSGDBalance,
  getDRMBBalance,
};
