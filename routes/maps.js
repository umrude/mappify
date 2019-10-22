
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post('/', (req, res) => {
    let query = `
      INSERT INTO maps (user_id)
      VALUES (1)
      RETURNING *;`
    db.query(query)
      .then(data => {
        // console.log('DATA ROWS:', data.rows);
        res.json(data.rows);
      })
      .catch(err => console.log("here", err));
  });

  router.get("/", (req, res) => {
    db.query(`SELECT id FROM maps;`)
      .then(data => {
        console.log("yay", data.rows[0]);
        res.send(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  // SKELETON EXAMPLE

  // router.get("/", (req, res) => {
  //   let query = `SELECT * FROM widgets`;
  //   console.log(query);
  //   db.query(query)
  //     .then(data => {
  //       const widgets = data.rows;
  //       res.json({ widgets });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  return router;
};
