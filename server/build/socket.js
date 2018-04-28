"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	socket: {},

	register: function register(socket) {
		this.socket = socket;
	},
	emit: function emit(event, obj) {
		this.socket.emit(event, obj);
	},
	on: function on(event, obj) {
		this.socket.on(event, obj);
	}
};
//# sourceMappingURL=socket.js.map