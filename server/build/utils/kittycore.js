'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _kittycoreAbi = require('./kittycore-abi');

var _kittycoreAbi2 = _interopRequireDefault(_kittycoreAbi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractAddress = '0x06012c8cf97bead5deae237070f9587f8e7a266d';

// const instance = new web3.eth.Contract(
//   abi,
//   contractAddress
// )

var contract = _web2.default.eth.contract(_kittycoreAbi2.default);
var instance = contract.at(contractAddress);

exports.default = instance;
//# sourceMappingURL=kittycore.js.map