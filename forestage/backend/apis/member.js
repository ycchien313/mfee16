const express = require('express');
const router = express.Router();
const db = require('../utils/db');

const conn = db.connection;

module.exports = router;
