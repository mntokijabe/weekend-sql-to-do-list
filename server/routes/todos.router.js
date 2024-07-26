const router = require('express').Router();
const pool = require('../modules/pool');

router.get ('/', (req, res) => {
    console.log('received request for job list');
    const queryText = `
        SELECT * FROM "todos"
            ORDER BY "id";
        `
    pool.query(queryText)
    .then(dbResult=> {
        console.log('received this data from the DB',dbResult.rows);
        const jobs = dbResult.rows;
        res.send(jobs)
    })
    .catch(dbErr => {
        console.log('error getting job list from db', dbErr);
        res.sendStatus(500)
    })
})  //end GET



module.exports = router;



