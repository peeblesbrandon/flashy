"use strict";

const MongoClient = require("mongodb");
const mongoose = require("mongoose");
// require mongo data models here

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;

module.exports = function(app) {
    app.route("/some/route/here")
        .get((req, res, next) => {
            return res.status(200);
        })
}