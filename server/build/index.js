'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// App Setup
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use('/', function (req, res) {
    res.send('works');
});
app.use(errorHandler);

function errorHandler(err, req, res, next) {
    console.log('errrrr', err);
    res.status(500).send(err);
}

// Server Setup
var port = process.env.PORT || 8000;
(0, _http.createServer)(app).listen(port, function () {
    console.log('> Server listening on ' + port);
});
//# sourceMappingURL=index.js.map