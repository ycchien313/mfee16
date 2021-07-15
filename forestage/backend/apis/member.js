const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/', () => {
    console.log(1);
});

module.exports = router;
