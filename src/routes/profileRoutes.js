const { Router } = require('express');
const profileController = require('../controllers/profileController');

const router = Router();
router.post('/profiles', profileController.create);
router.get('/profiles/:id', profileController.getById);

module.exports = router;
