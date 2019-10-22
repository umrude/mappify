const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const addresses = req.body.address
    let values = ``
    
    for (const item of addresses) {
      values += `(1,'${item}')${addresses.indexOf(item) === addresses.length - 1 ? ' ' : ', '}`
    }
    console.log('values: ', values);

    let query = `
      INSERT INTO markers (map_id, address)
      VALUES ${values}
      RETURNING*;
    `;

    db.query(query)
    .then(data => {
      console.log('', data.rows);
      res.send('success');
    })
    .catch(err => console.log(err))
  })

  return router
}