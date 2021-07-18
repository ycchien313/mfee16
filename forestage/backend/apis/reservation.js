const express = require('express');
const router = express.Router();
const db = require('../utils/db')

router.get('/seat', async (req, res)=>{
    let getSeatSql = 'SELECT seat_id, name, minimum_order FROM seat'
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
    let getRemainingSeatsSql = 'SELECT s.name, s.seat_number-SUM(r.attendance) AS remainingSeats, s.seat_id FROM reservation r, seat s WHERE date=? AND s.seat_id = r.seat_id GROUP BY seat_id'

    let RemainingSeats = await db.connection.queryAsync(getRemainingSeatsSql,[req.params.date])
    
    res.send(RemainingSeats)
    // console.log(req.params.date)
})

router.get('/seat', async(req, res)=> {
    let getSeatInfoSql = ''
})

module.exports = router;
