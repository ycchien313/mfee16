const express = require('express');
const router = express.Router();
const db = require('../utils/db')

router.get('/seat', async (req, res)=>{
    let getSeatSql = 'SELECT * FROM seat'
    let result = await db.connection.queryAsync(getSeatSql)
    res.json(result)
})

router.get('/singer-calendar', async(req, res)=>{
    let getCalendarSql = 'SELECT singer_id, date FROM singer_calendar WHERE DATEDIFF(date, CURDATE())>=0 ORDER BY date LIMIT 10'
    let result = await db.connection.queryAsync(getCalendarSql)
    res.json(result)
})

router.get('/:date', async(req, res)=>{
    // let getReservationSeatTotal = 'SELECT seat_id, attendance FROM reservation WHERE date=? GROUP BY seat_id'
    let getReservationSeatTotal = 'SELECT s.name, SUM(r.attendance), s.seat_id FROM reservation r, seat s WHERE date=? AND s.seat_id = r.seat_id GROUP BY seat_id'
    let reservationSeatTotal = await db.connection.queryAsync(getReservationSeatTotal,[req.params.date])
    
    res.send(reservationSeatTotal)
    // console.log(req.params.date)
})

module.exports = router;
