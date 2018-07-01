module.exports = function(txs) {
  return txs.reduce((obj, txs) => {
    obj[txs.hash] = txs;
    return obj;
  }, {});
}
