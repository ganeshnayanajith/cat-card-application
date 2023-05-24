'use strict';
const express = require('express');
const router = express.Router();
const CatController = require('../controllers/cat.controller');

router.post('/merge', CatController.merge);

module.exports = router;