const express = require('express');
const mongoose = require('mongoose');
const imageRoute = require('./image-router');
// import our current configuration
const config = require('./config');

const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' });


const routesAuth = require('./routes/auth');

const path = require('path')
const app = express();

const bodyParser = require('body-parser')
var cors = require('cors');
app.use(express.static('uploads'));

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', routesAuth);




// routes (for uploading images to storage)
app.use('/api', imageRoute.routes)

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const { message } = error;
    const { data } = error;
    res.status(status).json({ message, data });
});

const PORTE = process.env.PORT || 8080
const server = app.listen(PORTE, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});

mongoose.connect(process.env.DATABASE_URL,  {
    useNewUrlParser: "true",
    
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})
