const txsToResObj = require('./txs-to-res-obj');

module.exports = function (addressArray) {
  return addressArray.reduce((obj, addr) => {
    addr.txs = txsToResObj(addr.txs);
    obj[addr.address] = addr;
    return obj;
  }, {});
};
