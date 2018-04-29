'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _kittycore = require('./utils/kittycore');

var _kittycore2 = _interopRequireDefault(_kittycore);

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  newGiftingList: function newGiftingList(req, res, next) {
    var data = req.body;
    var from = data.from,
        to = data.to,
        kittenId = data.kittenId,
        image = data.image,
        blockNumber = data.blockNumber,
        txHash = data.txHash;

    _model2.default.findOne({
      from: from, to: to, kittenId: kittenId
    }).then(function (existing) {
      if (existing) {
        existing.status = 'Pending';
        existing.blockNumber = blockNumber;
        return existing.save();
      } else {
        var newTransaction = new _model2.default({
          from: from,
          to: to,
          kittenId: kittenId,
          image: image,
          blockNumber: blockNumber,
          status: 'Pending',
          txHash: txHash
        });
        return newTransaction.save();
      }
    }).then(function (saved) {
      return res.send(saved);
    }).catch(next);
  },
  getListByUserAddress: function getListByUserAddress(req, res, next) {
    var address = req.params.address;

    _model2.default.find({
      from: address
    }).then(function (result) {
      res.send(result);
    }).catch(next);
  },
  getKittyListByUserAddress: function getKittyListByUserAddress(req, res, next) {
    var address = req.params.address;

    _model2.default.find({
      from: address
    }).then(function (transactions) {
      var result = transactions.map(function (r) {
        return r.kittenId;
      });
      res.send(result);
    }).catch(next);
  },
  removeGifting: function removeGifting(req, res, next) {
    var _req$body = req.body,
        from = _req$body.from,
        to = _req$body.to,
        kittenId = _req$body.kittenId;

    _model2.default.findOneAndRemove({
      from: from, to: to, kittenId: kittenId
    }).then(function (result) {
      res.send('deleted');
    }).catch(next);
  },
  giftingSocket: function giftingSocket(sk, address) {
    _model2.default.find({
      from: address
    }).then(function (result) {
      sk.emit('CURRENT_TRANSACTION', result);
    }).catch(console.error);
    _listener2.default.byAddrWithSocket(sk, address);
  },
  getLatestGiftingBySocket: function getLatestGiftingBySocket(sk, address) {
    _model2.default.find({
      from: address
    }).then(function (result) {
      sk.emit('CURRENT_TRANSACTION', result);
    }).catch(console.error);
  }
};
//# sourceMappingURL=controllor.js.map