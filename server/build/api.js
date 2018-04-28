'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _level = require('level');

var _level2 = _interopRequireDefault(_level);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _kittycore = require('./utils/kittycore');

var _kittycore2 = _interopRequireDefault(_kittycore);

var _web = require('./utils/web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();


var db = (0, _level2.default)('gifting.db', { valueEncoding: 'json' });

router.get('/catList/:address', function (req, res, next) {
  var address = req.params.address;

  _controller2.default.getKitties(address).then(function (list) {
    console.log('cool');
    res.send(list);
  }).catch(next);
});

router.get('/giftingList/:address', function (req, res, next) {
  var address = req.params.address;

  db.get(address, function (err, value) {
    if (!value) value = JSON.stringify([]);
    value = JSON.parse(value);
    res.send(value);

    console.log('====>');

    // getting nothing
    // var subscription = web3.eth.subscribe('logs', {
    //     address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
    //     topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
    // }, function(error, result){
    //     if (!error) console.log(result);
    // })
    // .on("data", function(log){
    //     console.log(log);
    // })
    // .on("changed", function(log){
    // })
    // .on('error', console.error);

    // getting nothing
    // kittycore.events.Transfer()
    //   .on('data', function(event){
    //       console.log('data')
    //       console.log('data', event);
    //     })
    //     .on('changed', function(event){
    //       console.log('changed')
    //       console.log('changed',event);
    //   })
    //   .on('error', console.error);

    // works
    // kittycore.getPastEvents('Transfer', {
    //   filter: {
    //     from: address
    //   },
    //   fromBlock: 5517568,
    //   toBlock: 'latest',
    //   limit: 1
    // },(err,evts)=>{
    //   console.log(err,evts);
    // })

    // getting nothing
    // kittycore.events.Transfer({
    //   filter: {
    //     tokenId: indexList
    //   },
    //   fromBlock: 0
    // }).on('data', function(event){
    //     console.log('data',event);
    //   })
    //   .on('changed', function(event){
    //       console.log('changed',event);
    //   })
    //   .on('error', console.error);
  });
});

router.post('/giftingList', function (req, res, next) {
  var data = req.body;
  var address = data.from;
  db.get(address, function (err, value) {
    if (value) value = JSON.parse(value);
    if (!value) value = [];
    if (value.filter(function (v) {
      return v.kittenId == data.kittenId;
    }).length == 0) {
      delete data.from;
      data.status = 'Pending';
      value.push(data);
      console.log(value);
      db.put(address, JSON.stringify(value));
    }
  });
  res.send();
});

exports.default = router;
//# sourceMappingURL=api.js.map