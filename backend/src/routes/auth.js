const express = require('express');
const authController = require('../controller/authController.js');

const authRouter = express.Router();
const auth = new authController();

authRouter.post('/register', auth.register)

authRouter.post('/login', auth.login)
authRouter.get('/logout', auth.logout)
authRouter.get('/cookie', (_,res) => {
    let token = res.cookie.token
    res.json({token})
})


module.exports = authRouter;
