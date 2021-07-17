const express = require("express");
const router = express.Router();
const db = require("../utils/db");
router.get("/singer", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync("SELECT * FROM singer");
    res.send(queryResult);
});
module.exports = router;
