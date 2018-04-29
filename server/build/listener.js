'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _web = require('./utils/web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterwatch = _web2.default.eth.filter({
  address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  from: _web2.default.eth.blockNumber,
  topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
});

function decodeData(log) {
  return {
    from: '0x' + log.data.slice(2 + 24, 66).toString(16),
    to: '0x' + log.data.slice(66 + 24, 130),
    kittenId: parseInt(log.data.slice(131 + 58, 195), 16),
    transactionHash: log.transactionHash.toString()
  };
}

exports.default = {
  byAddrWithSocket: function byAddrWithSocket(sk, addr) {
    try {
      sk.emit('UPDATE_TRANSACTION', 'start listening...');
    } catch (err) {};
    filterwatch.watch(function (err, log) {
      if (err) return console.error('Filter Watch Error: ', err);

      var _decodeData = decodeData(log),
          from = _decodeData.from,
          to = _decodeData.to,
          kittenId = _decodeData.kittenId,
          transactionHash = _decodeData.transactionHash;

      var d = new Date();
      if (from == addr) {
        // updating only when the addr match
        console.log('bingGo!!!');
        _model2.default.findOneAndUpdate({
          txHash: transactionHash
        }, {
          $set: {
            status: 'Successful',
            txHash: transactionHash
          }
        }, {
          new: true
        }).then(function (dbKitten) {
          try {
            sk.emit('UPDATE_RELAVANT_TRANSACTION', { to: to, kittenId: kittenId, transactionHash: transactionHash });
          } catch (err) {};
        }).catch(console.error);
      } else if (from !== '0x0000000000000000000000000000000000000000') {
        // console.log('\x1b[90m[ethereum]\t>>> skipped this [Transaction] event: \x1b[0m', transactionHash);
        try {
          sk.emit('UPDATE_TRANSACTION', { timestamp: d.toLocaleTimeString(), from: from, to: to, kittenId: kittenId, transactionHash: transactionHash });
        } catch (err) {};
      }
    });
  },
  start: function start() {
    console.log('\x1b[32m>>> Listening to cryptokitties...\x1b[0m');
    filterwatch.watch(function (err, log) {
      if (err) return console.error('Filter Watch Error: ', err);

      var _decodeData2 = decodeData(log),
          from = _decodeData2.from,
          transactionHash = _decodeData2.transactionHash;

      if (from !== '0x0000000000000000000000000000000000000000') {
        _model2.default.findOne({ txHash: transactionHash }).then(function (kitten) {
          if (!kitten) {
            return console.log('\x1B[90m>>> Skipped [Transaction] event: ' + transactionHash + ' \x1B[0m');
          } else {
            return _model2.default.findOneAndUpdate({
              txHash: transactionHash
            }, {
              $set: {
                status: 'Successful',
                txHash: transactionHash
              }
            }, {
              new: true
            }).then(function (updated) {
              console.log('Updated!', transactionHash);
            });
          }
        }).catch(console.error);
      }
    });
  }
};
//# sourceMappingURL=listener.js.map