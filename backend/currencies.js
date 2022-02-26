function checkCurrency(contractAddress) {
  if (
    contractAddress.toLowerCase() ==
    "0x25d1d454084Df3B23B0C982bc2E4CC2Dd06a7F12".toLowerCase()
  ) {
    return "SGD";
  } else if (
    contractAddress.toLowerCase() ==
    "0x54ec93A799ea75c2ED8685d6310f5bF0c37c1bE4".toLowerCase()
  ) {
    return "RMB";
  }
}

module.exports = {
  checkCurrency,
};
