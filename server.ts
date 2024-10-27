import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
	console.log('A user connected! 👋');

	socket.on('chat message', (msg) => {
		console.log('Message received:', msg);
		io.emit('chat message', msg);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected 😢');
	});
});

const PORT = 3000;
httpServer.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
