const express = require('express');
const app = express();
const authApi = require('./apis/auth');
const commentApi = require('./apis/comment');
const deliveryApi = require('./apis/delivery');
const dishApi = require('./apis/dish');
const homeApi = require('./apis/home');
const memberApi = require('./apis/member');
const reservationApi = require('./apis/reservation');
const singerApi = require('./apis/singer');
const db = require('./utils/db');
const connection = db.connection;
const cors = require('cors');
const port = 3001;

require('dotenv').config();

// const fs = require('fs');
// const https = require('https');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(cors())
app.use('/auth', authApi);
app.use('/comment', commentApi);
app.use('/delivery', deliveryApi);
app.use('/dish', dishApi);
app.use('/home', homeApi);
app.use('/member', memberApi);
app.use('/reservation', reservationApi);
app.use('/singer', singerApi);

app.get('/', (req, res) => {
    console.log('URL:', req.url);
    res.status(200).json({ url: req.url });
});

// 404 錯誤
app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`請連線至 http://127.0.0.1:${port}`);
    connection.connect();   
});

// https
//     .createServer(
//         {
//             key: fs.readFileSync('server.key'),
//             cert: fs.readFileSync('server.cert'),
//         },
//         app
//     )
//     .listen(8443, function () {
//         console.log(
//             'Example app listening on port 8443! Go to https://localhost:8443/'
//         );
//     });
