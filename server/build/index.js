'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.io = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _socket3 = require('./socket');

var _socket4 = _interopRequireDefault(_socket3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var io = exports.io = (0, _socket2.default)(server);

// App Setup
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    return res.send('works');
});

app.use(function (err, req, res, next) {
    console.log('errrrr', err);
    res.status(500).send(err);
});

io.on('connection', function (sk) {
    console.log('socket connectted!');
    _socket4.default.register(sk);
});

app.use('/api', _api2.default);
// Server Setup
var port = process.env.PORT || 8000;
server.listen(port, function () {
    console.log('> Server listening on ' + port);
});
//# sourceMappingURL=index.js.map