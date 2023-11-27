const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.param('id', UserController.checkID); // Param middleware, fires on "id"

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
