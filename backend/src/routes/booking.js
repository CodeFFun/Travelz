const express = require('express');


const bookingController = require('../controller/bookingController.js');

const bookingRouter = express.Router();

const booking = new bookingController();

//pass bookingId as id
bookingRouter.get('/',booking.getAllBooking)

//get all booking
bookingRouter.get('/',booking.getAllBooking)

//create booking, send guideId
bookingRouter.post('/:guideId',booking.bookingExists, booking.createBooking)

//pass booking as id
bookingRouter.patch('/:id', booking.updateBooking)

//pass bookingId as id
bookingRouter.delete('/:id', booking.deleteBooking)

module.exports = bookingRouter;
