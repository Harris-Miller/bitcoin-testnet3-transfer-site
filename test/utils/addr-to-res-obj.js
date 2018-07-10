const addrToResObj = require('../../utils/addr-to-res-obj');

describe('utils/addr-to-res-obj', () => {
  it('takes an array, converts it to an object, with each item in the array\'s address property becoming the the key int he new object', () => {
    const arr = [{
      address: 'abcdefg1234567',
      foo: 'bar',
      txs: [{
        hash: 'abc',
        biz: 'baz'
      }]
    }];

    expect(addrToResObj(arr)).to.deep.equal({
      abcdefg1234567: {
        address: 'abcdefg1234567',
        foo: 'bar',
        txs: {
          abc: {
            hash: 'abc',
            biz: 'baz'
          }
        }
      }
    });
  });
});
