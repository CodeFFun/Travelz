const express = require('express');
const userRouter = require('./user.js');
const authRouter = require('./Auth.js');
const reviewRouter = require('./review.js');
const bookingRouter = require('./booking.js');
const diaryRouter = require('./diary.js');  
const {verifyCookie} = require('../lib/cookie.js');

const router = express.Router();

router.use('/auth', authRouter)

router.use(verifyCookie);

router.use('/user', userRouter)
router.use('/review', reviewRouter)
router.use('/booking', bookingRouter)
router.use('/diary', diaryRouter)


module.exports = router;