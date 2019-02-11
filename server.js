//server.js
const app = require('./app')

const port = 1337;

app.listen(port, () => {
    console.log(`Lyssnar på port ${port}`);
})