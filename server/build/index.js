'use strict';

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

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

var _controllor = require('./controllor');

var _controllor2 = _interopRequireDefault(_controllor);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);

var io = (0, _socket2.default)(server);

// DB Setup
_mongoose2.default.connect(_config.mongodbUri).catch(function (err) {
    return console.error(err);
});

_mongoose2.default.Promise = global.Promise;

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

// Server Setup
var port = process.env.PORT || 8000;
server.listen(port, function () {
    console.log('>>> Server listening on ' + port);
});

// Socket Register
io.on('connection', function (sk) {
    sk.on('LISTEN_TO_UPDATE_TRANSACTION', function (addr) {
        console.log('\x1B[96m>>> Socket connection from ' + addr.substring(0, 7) + '\x1B[0m');
        _controllor2.default.giftingSocket(sk, addr);
    });
    sk.on('GET_LATEST_TRANSACTION', function (addr) {
        _controllor2.default.getLatestGiftingBySocket(sk, addr);
    });
});

// Expose API Route
app.use('/api', _api2.default);

// start listening to ethereum...
_listener2.default.start();
//# sourceMappingURL=index.js.map