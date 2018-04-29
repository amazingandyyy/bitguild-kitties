'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the model
var Schema = new _mongoose2.default.Schema({
    from: String,
    to: String,
    kittenId: Number,
    blockNumber: Number,
    image: String,
    status: String, //['Pending', 'Successful', 'Fail']
    txHash: String
}, {
    timestamps: true
});

exports.default = _mongoose2.default.model('Transactions', Schema);
//# sourceMappingURL=model.js.map