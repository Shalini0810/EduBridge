const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');

router.get('/', bmiController.getAllBMIRecords);
router.put('/:id', bmiController.updateBMI);

module.exports = router;
