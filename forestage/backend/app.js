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

// 加入 headers
// app.use(function (req, res, next) {
//     // 允許連接的網頁
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     // 允許的方法
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//     );

//     // Request headers you wish to allow
//     // res.setHeader(
//     //     'Access-Control-Allow-Headers',
//     //     'X-Requested-With,content-type'
//     // );

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

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

const server = require('http')
    .Server(app)
    .listen(port, () => {
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

//將啟動的 Server 送給 socket.io 處理
const socket = require('socket.io');
const io = socket(server);

//監聽 Server 連線後的所有事件，並捕捉事件 socket 執行
io.on('connection', (socket) => {
    //經過連線後在 console 中印出訊息
    console.log('WebSocket 連線成功');

    //監聽透過 connection 傳進來的事件
    socket.on('getMessage', (message) => {
        //回傳 message 給發送訊息的 Client
        socket.emit('getMessage', message);
    });

    /*回傳給所有連結著的 client*/
    socket.on('getMessageAll', (message) => {
        io.sockets.emit('getMessageAll', message);
    });

    /*回傳給除了發送者外所有連結著的 client*/
    socket.on('getMessageLess', (message) => {
        socket.broadcast.emit('getMessageLess', message);
    });
});
