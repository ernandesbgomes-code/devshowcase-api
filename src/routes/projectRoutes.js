const { Router } = require('express');
const projectController = require('../controllers/projectController');

const router = Router();
router.post('/projects', projectController.create);
router.get('/projects', projectController.getAll);

module.exports = router;
