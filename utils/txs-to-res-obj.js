module.exports = function (txsArray) {
  return txsArray.reduce((obj, txs) => {
    obj[txs.hash] = txs;
    return obj;
  }, {});
};
