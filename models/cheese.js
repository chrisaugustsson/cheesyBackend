const mongo = require("mongodb").MongoClient;
const dsn = process.env.DBWEBB_DSN || "mongodb://localhost:27017/cheeseTrade";

exports.getAllChese = async function () {
    const client = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection("cheese");

    const res = await col.find({}, { projection: { _id: 0 } }).toArray();

    await client.close();

    return res;
}

exports.getCurrentChesePrice = async function (chese) {

    const client = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection("cheese");

    const res = await col.find({ name: chese }, { projection: { _id: 0 } }).toArray();

    await client.close();

    return res[0].price;
}

exports.updatePrice = async function (cheese, price, time) {
    const client = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection("cheese");

    await col.updateMany({ name: cheese }, {
        $set: { "price": price },
        $push: { history: price, timeStamp: time }
    });

    await client.close();
}

exports.getNewPrice = function (cheese) {
    let random = () => {
        return Math.random() > 0.5 ? 1 : -1;
    }

    let start = cheese.price;
    let rate = cheese.rate;
    let variance = cheese.variance;
    let newPrice = start * rate + variance * random();
    let rounded = Math.round(newPrice * 100) / 100;

    return rounded;
}