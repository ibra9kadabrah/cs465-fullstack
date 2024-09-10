const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel');

/* GET travel page */
router.get('/', travelController.travelList);

module.exports = router;