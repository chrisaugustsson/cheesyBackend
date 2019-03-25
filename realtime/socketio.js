const socketio = require('socket.io');
const cheese = require("../models/cheese");

module.exports = async function (server) {
    const io = socketio(server);
    const allCheese = await cheese.getAllChese();

    io.on('connection', async (socket) => {
        // Log when user connect
        console.log("Client just connected");
        io.emit("cheese", allCheese);

        // Disconnects a user
        socket.on('disconnect', function () {
            console.log("Client disconnected");
        });
    });

    setInterval(() => {
        allCheese.map(async (current) => {
            const time = new Date();
            let newPrice = cheese.getNewPrice(current);
            current.price = newPrice;
            current.history.push(newPrice);
            current.timeStamp.push(time);
            await cheese.updatePrice(current.name, newPrice, time);
            return current;
        })
        io.emit("cheese", allCheese);
    }, 5000);
}