import { io } from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:3001";
let socket;

export const initiateSocketConnection = () => {
  
	socket = io(ENDPOINT);
	console.log(`Connecting socket...`);
}

export const subscribeToChat = (cb) => {
	socket.emit('my message', 'Hello there from React.');

		// socket.on('my broadcast', msg => {
		// 	return cb(null, msg);
		// });

		socket.on('drawing', data => {
			return cb(null, data);
		});
}