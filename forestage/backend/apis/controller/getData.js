const db = require("../../utils/db");

function getData(id) {
    let queryResult = await db.connection.queryAsync(
        `SELECT * FROM article inner join tag where tag.tag_id = 15`
    );
}

module.exports = getData;
