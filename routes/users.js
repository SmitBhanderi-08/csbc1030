const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');

router.get('/', UserController.getAllUsers);

router.post('/login', UserController.login);

router.use(require('../middleware/authenticationMiddleware'));

router.get('/:userId/posts', UserController.getUserPosts);

module.exports = router;
