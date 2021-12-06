const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index.controller')
const gerController = require('../controllers/ger.controller')


// GER --------------------------------------------------------------------
router.post('/ponerse-en-contacto', gerController.sendEmails)
router.get('/data-GER', gerController.getInfo)

// INDEX -------------------------------------------------------------------
router.get('/', indexController.index)

module.exports = router