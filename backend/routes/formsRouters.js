const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController')

router.post('/user-form',formController.forms);
router.get('/user-form',formController.getAllForms);

module.exports = router;