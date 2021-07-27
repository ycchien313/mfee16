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
const session = require('express-session');
const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const port = 3001;

require('dotenv').config();

const fs = require('fs');
const https = require('https');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(
    session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authApi);
app.use('/comment', commentApi);
app.use('/delivery', deliveryApi);
app.use('/dish', dishApi);
app.use('/home', homeApi);
app.use('/member', memberApi);
app.use('/reservation', reservationApi);
app.use('/singer', singerApi);

passport.use(
    new facebookStrategy(
        {
            // pull in our app id and secret from our auth.js file
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            // callbackURL: 'https://localhost:8443/facebook/callback',
            callbackURL: 'http://localhost:3001/facebook/callback',
            profileFields: [
                'id',
                'displayName',
                'name',
                'gender',
                'picture.type(large)',
                'email',
            ],
        }, // facebook will send back the token and profile

        function (accesstoken, refreshToken, profile, done) {
            // console.log(profile);
            // return done(null, profile);

            User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    return done(null, user);
});

app.get('/profile', (req, res) => {
    console.log(req.url);
    res.send('you are authenticated');
});

app.get(
    '/facebook',
    passport.authenticate('facebook', { scope: 'email, name' }),
    (req, res) => {
        console.log(req.url);
    }
);

app.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/',
    }),
    (req, res) => {
        console.log(req.url);
    }
);
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
