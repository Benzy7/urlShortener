const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config')

app.use(bodyParser.json());

mongoose.connect(
    process.env.DB_Conn,
    () => console.log('db conected')
);

const userRoutes = require('./routes/users');
const urlRoutes = require('./routes/urls');

app.use('/api/user', userRoutes);
app.use('/urls', urlRoutes);

/* app.get('/', (req,res)  => {
    res.send('Test..')
}) */

app.listen(3000, () => console.log("server up"));