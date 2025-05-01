const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle receiving a chat message
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);  // Broadcast the message to all connected clients
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server on port 3001
server.listen(3002, () => {
  console.log('Server running at http://localhost:3002');
});
