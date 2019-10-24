const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //adds markers to db
  router.post('/', (req, res) => {
    const placeIds = req.body.placeIds;
    const mapId = req.body.mapId;
    console.log("req body: ", req.body);
    let values = ``;

    for (const item of placeIds) {
      values += `(${mapId},'${item}')${placeIds.indexOf(item) === placeIds.length - 1 ? ' ' : ', '}`;
    }
    console.log('values: ', values);

    let query = `
      DELETE
      FROM markers
      WHERE map_id = ${mapId};

      INSERT INTO markers (map_id, place_id)
      VALUES ${values}
      RETURNING*;

      INSERT INTO contributions (user_id, map_id)
      VALUES (${req.session.user_id}, ${mapId})
      RETURNING *;
    `;

    db.query(query)
      .then(data => {
        console.log('', data.rows);
        res.send('success');
      })
      .catch(err => console.log(err));
  });

  return router;
};
