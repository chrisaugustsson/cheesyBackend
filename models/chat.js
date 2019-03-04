const mongo = require("mongodb").MongoClient;
const dsn = process.env.DBWEBB_DSN || "mongodb://localhost:27017/chat";


/**
 * Adds a new message to the DB.
 *
 * @async
 *
 * @param {string} userName     Name of the person that created the message.
 * @param {string} message      The message.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<void>} Void
 */
exports.addMessage = async function (userName, message) {
    const client = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection("chat");

    await col.insert({
        user: userName,
        message: message
    });

    await client.close();
}

exports.getMessages = async function () {
    const client = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection("chat");

    const res = await col.find({}, { projection: { _id: 0 } }).toArray();

    await client.close();

    return res;
}