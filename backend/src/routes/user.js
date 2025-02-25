const express = require('express');
const userController = require('../controller/userController.js');

const userRouter = express.Router();
const user = new userController();


userRouter.get('/role/:role', user.getUserByRole);
userRouter.get('/role', user.checkRole);

userRouter.get('/', user.getUserProfile);
userRouter.get('/:id', user.getUserById);

userRouter.patch('/', user.updateUser);

userRouter.delete('/:id', user.deleteUser);

module.exports = userRouter;