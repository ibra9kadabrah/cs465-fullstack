const express = require('express');
const router = express.Router();
const main = require('../controllers/main');

/* GET home page. */
router.get('/', main.index);

module.exports = router;