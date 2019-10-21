/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post('/', (req, res) => {
    let query = `
      INSERT INTO maps (user_id)
      VALUES (1)
      RETURNING *;`
    db.query(query)
    .then(data => {
      console.log('DATA ROWS:', data.rows)
      res.json(data.rows);
    })
    .catch(err => console.log(err))
  })



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
