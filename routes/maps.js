
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post('/', (req, res) => {
    let query = `
      INSERT INTO maps (user_id)
      VALUES (1)
      RETURNING *;
      `
    db.query(query)
    .then(data => {
      console.log('\n SQL INSERT:  map_id --> Success ✅ \n\n', data.rows)
      res.json(data.rows);
    })
    .catch(err => console.log(err))
  })


  router.get('/:id', (req, res) => {
    let id = req.params.id;
    let query = `
      SELECT markers.place_id
      FROM markers
      JOIN maps ON maps.id = markers.map_id
      WHERE map_id = $1;
      `;
    db.query(query, [id])
    .then(data => {
      console.log('\n SQL SELECT:  place_id --> Success ✅ \n\n', data.rows)
      res.send(data.rows);
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
