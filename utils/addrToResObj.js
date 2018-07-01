const txsToResObj = require('./txsToResObj');

module.exports = function(addr) {
  return addr.reduce((obj, addr) => {
    addr.txs = txsToResObj(addr.txs);
    obj[addr.address] = addr;
    return obj;
  }, {});
}
