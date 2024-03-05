import express from 'express';
import configViewEngine from './configs/viewEngine';
// import initWebRoute from './route/web';
import initAPIRoute from './route/api';
import initAPIRoute1 from './route/api_upload_file';
const cors = require('cors');
// import connection from './configs/connectDB';
require('dotenv').config()

const app = express()

const corsOptions = {
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors());
const port = process.env.PORT || 2209;

app.use(cors(corsOptions));
app.use(express.static("./src/public/"));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//set up new enine
configViewEngine(app);

//init web route
// initWebRoute(app);

initAPIRoute(app);
initAPIRoute1(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})