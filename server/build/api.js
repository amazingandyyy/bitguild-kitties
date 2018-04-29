'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controllor = require('./controllor');

var _controllor2 = _interopRequireDefault(_controllor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.post('/giftingList', _controllor2.default.newGiftingList);
router.post('/removeGifting', _controllor2.default.removeGifting);
router.get('/giftingList/:address', _controllor2.default.getListByUserAddress);
router.get('/giftingKittyList/:address', _controllor2.default.getKittyListByUserAddress);

exports.default = router;
//# sourceMappingURL=api.js.map