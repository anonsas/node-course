const express = require('express');

const router = express.Router();
const UserController = require('../controller/user.controller');

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
