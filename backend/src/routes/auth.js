const express = require('express');
const authController = require('../controller/authController.js');
const dataResponse = require('../lib/dataResponse.js');

const authRouter = express.Router();
const auth = new authController();

authRouter.post('/register', auth.register)

authRouter.post('/login', auth.login)
authRouter.get('/logout', auth.logout)
authRouter.get('/cookie', (req,res) => {
    let token = req.cookies.token
    if(!token){
        return res.json(dataResponse(null, 'No cookie found', 404));
    }
    return res.json(dataResponse(token, 'Cookie fetched successfully', 200));
})


module.exports = authRouter;
