'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _web = require('./utils/web3');

var _web2 = _interopRequireDefault(_web);

var _kittycore = require('./utils/kittycore');

var _kittycore2 = _interopRequireDefault(_kittycore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getKitties: function getKitties(address) {
    var url = 'https://www.cryptokitties.co/profile/' + address.toString();
    return new Promise(function (resolve, reject) {
      (0, _request2.default)(url, function (err, res, html) {
        if (err || !res || !html) return reject();
        var list = [];
        var $ = _cheerio2.default.load(html);
        console.log(html);
        return resolve({ list: list });
      });
    });
  }
};
//# sourceMappingURL=controller.js.map