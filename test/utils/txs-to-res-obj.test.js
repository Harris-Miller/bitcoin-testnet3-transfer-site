const txsToResObj = require('../../utils/txs-to-res-obj');

describe('utils/txs-to-res-obj', () => {
  it('takes an array, converts it to an object, with each item in the array\'s hash property becoming the key in the new object', () => {
    const arr = [{
      hash: 'abc',
      foo: 'bar'
    }, {
      hash: 'def',
      biz: 'baz'
    }];

    expect(txsToResObj(arr)).to.deep.equal({
      abc: {
        hash: 'abc',
        foo: 'bar'
      },
      def: {
        hash: 'def',
        biz: 'baz'
      }
    });
  });
});
