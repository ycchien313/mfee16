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
    res.send('');
});

// 404 錯誤
app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`請連線至 http://127.0.0.1:${port}`);
    connection.connect();
});
