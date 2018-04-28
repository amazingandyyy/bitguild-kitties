export default {
  socket: {},

	register(socket) {
		this.socket = socket;
	},

	emit(event, obj) {
		this.socket.emit(event, obj);
	},
	
	on(event, obj) {
		this.socket.on(event, obj);
	}
}