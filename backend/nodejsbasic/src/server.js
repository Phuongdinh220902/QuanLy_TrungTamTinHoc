import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
const cors = require('cors');
// import connection from './configs/connectDB';
require('dotenv').config()

const app = express()

app.use(cors());
const port = process.env.PORT || 2209;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//set up new enine
configViewEngine(app);

//init web route
initWebRoute(app);

initAPIRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})