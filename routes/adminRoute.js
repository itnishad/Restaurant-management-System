const express = require('express');

const { adminIndex } = require('../controllers/indexController')


const router = express.Router();


router.get('/index', adminIndex)

module.exports = router