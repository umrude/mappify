/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {



  router.get("/:id", (req, res) => {
    let id = req.params.id;
    req.session.user_id = id;

    console.log('🍪 COOKIE SESSION ID: ', id);
    let templateVars = { id: req.session.user_id};
    res.render('index.ejs', templateVars);
  });




  return router;
};
