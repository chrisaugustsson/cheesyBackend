//server.js
const app = require('./app')

const port = 1338;

app.listen(port, () => {
    console.log(`Lyssnar på port ${port}`);
})