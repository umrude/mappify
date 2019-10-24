const express = require('express');
const router = express.Router();

module.exports = (db) => {





  // puts map into database initially
  router.post('/', (req, res) => {
    let title = req.body.title;
    let desc = req.body.description;
    let query = `
      INSERT INTO maps (user_id, title, description)
      VALUES (${req.session.user_id}, '${title}', '${desc}')
      RETURNING *;
      `;
    db.query(query)
      .then(data => {
        console.log('\n SQL INSERT:  map_id --> Success ✅ \n\n', data.rows[0]);
        res.json({ id: data.rows[0].id });
      })
      .catch(err => console.log("here", err));
  });






  // gets info from database about maps and passes to the front-end to store in maps lists
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM maps;`)
      .then(data => {
        console.log("yay", data.rows);
        res.send(data.rows);
      })
      .catch(err => console.log(err));
  });








  router.get("/:id", (req, res) => {
    let id = req.params.id;
    let query = `
      SELECT DISTINCT markers.place_id
      FROM markers
      JOIN maps ON maps.id = markers.map_id
      WHERE map_id = $1;
      `;
    db.query(query, [id])
      .then(data => {
        console.log("data is: ", data)
        console.log('\n SQL SELECT:  place_id --> Success ✅ \n\n', data.rows);
        res.send(data.rows);
      })
      .catch(err => console.log(err));
  });

  return router;
};
