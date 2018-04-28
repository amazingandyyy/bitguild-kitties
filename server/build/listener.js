'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _repl = require('repl');

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _web = require('./utils/web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterwatch = _web2.default.eth.filter({
  address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  from: 5518793 - 3000 * 10,
  topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
});

function decodeData(data) {
  var result = {};
  result.from = '0x' + data.slice(2 + 24, 66).toString(16);
  result.to = '0x' + data.slice(66 + 24, 130);
  result.kittenId = parseInt(data.slice(131 + 58, 195), 16);
  return result;
}

exports.default = {
  start: function start(sk) {
    console.log('>>> Listening to cryptokitties...');
    filterwatch.watch(function (err, log) {
      if (err) {
        return console.error('Filter Watch Error: ', error);
      } else {
        var data = decodeData(log.data);
        var from = data.from,
            to = data.to,
            kittenId = data.kittenId;

        _model2.default.findOneAndUpdate({
          from: from, to: to, kittenId: kittenId
        }, {
          $set: { status: 'Successful' }
        }, {
          new: true
        }).then(function (updated) {
          if (!updated) return console.log('>>> skipped this [Transaction] event');
          console.log(updated);
          if (sk) {
            sk.emit('UPDATE_TRANSACTION');
          }
        }).catch(function (err) {
          console.error('Removing Error: ', error);
        });
      }
    });
  }
};
//# sourceMappingURL=listener.js.map