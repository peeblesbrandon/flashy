const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const users = require('./routes/api/users');
// const apiRouter = require('./routes/api');
require('dotenv').config();

const app = express();

// cors and express
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false })); // parse url-encoded bodies

// database config
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
db.once('open', () => {
    console.log('✅ Successfully connected to MongoDB database');
});

// passport middleware & config
app.use(passport.initialize());
require('./config/passport')(passport);

// routes
app.use('/api/users', users);
// app.use('/app', apiRouter);

const port = process.env.port || 5000;
// process.env.port is Heroku's port if deploying there
app.listen(port, () => {
    console.log(`✅ Server is running on port: ${port}`);
});