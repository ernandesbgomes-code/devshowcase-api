const { Router } = require('express');
const technologyController = require('../controllers/technologyController');

const router = Router();
router.post('/technologies', technologyController.create);
router.get('/technologies', technologyController.getAll);

module.exports = router;
