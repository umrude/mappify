const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const placeIds = req.body.placeIds;
    let values = ``;

    for (const item of placeIds) {
      values += `(1,'${item}')${placeIds.indexOf(item) === placeIds.length - 1 ? ' ' : ', '}`;
    }
    console.log('values: ', values);

    let query = `
      DELETE FROM markers;
      INSERT INTO markers (map_id, place_id)
      VALUES ${values}
      RETURNING*;
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
