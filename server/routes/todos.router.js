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

// DELETE operation
router.delete ('/:id', (req, res) => {
    const jobId = req.params.id
    const sqlText = `DELETE FROM "todos"
                    WHERE "id" = $1;`
    const sqlValue = [jobId];

    pool.query(sqlText, sqlValue)
        .then(dbResult => {
            res.sendStatus(201)
        })
        .catch(dbError => {
            console.log('error in delete job',deError)
            res.sendStatus(500);
        })
})

// POST operation

router.post('/' , (req, res) => {
    console.log('received new todo')
    const sqlText = `
        INSERT INTO "todos"
            ("text")
            VALUES
            ($1);`
    const sqlValue = [req.body.toDo]
    pool.query(sqlText, sqlValue) 
        .then((response) => {
            res.sendStatus(201)
        })
        .catch(error => {
            console.log('Error in posting todo', error)
            res.sendStatus(500)
        })
})


// PUT operation
router.put ('/:taskId', (req, res) => {
    const jobId = req.params.taskId;
    console.log ('received  jobId of',req.params.taskId)

    const sqlText = `
        UPDATE "todos"
            SET "isComplete" = NOT "isComplete"
            WHERE "id" = $1;`
    const sqlValue = [jobId]
    pool.query(sqlText, sqlValue)
    .then((dbResponse) => {
        console.log('changed status')
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.log('error updating job status',dbErr)
        res.sendStatus(500)
    })
})

module.exports = router;



