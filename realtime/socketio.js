const socketio = require('socket.io');

module.exports = function (server) {
    const io = socketio(server);

    io.on('connection', (socket) => {
        // Log when user connect
        console.log(socket.handshake.query.user + " just connected");

        // Get all the connected clients
        let clients = io.sockets.clients().connected;
        let clientNames = [];
        Object.keys(clients).map((key) => {
            clientNames.push(clients[key].handshake.query.user)
        })

        // Disconnects a user
        socket.on('disconnect', function () {
            console.log(socket.handshake.query.user + " disconnected");
        });

        // Clients sends message
        socket.on('message', (message) => {
            io.emit('message', { user: message.user, message: message.message, you: false });
        });

        // Client is typing
        socket.on("typing", () => {
            socket.broadcast.emit("typing", { user: socket.handshake.query.user, typing: true });
        })

        // Client stoped typing
        socket.on("notTyping", () => {
            socket.broadcast.emit("typing", { user: socket.handshake.query.user, typing: false });
        })
    });
}