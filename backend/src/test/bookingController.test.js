const request = require('supertest');
const express = require('express');
const bookingController = require('../controller/bookingController');
const dataResponse = require('../lib/dataResponse');
const { booking } = require('../lib/client');

jest.mock('../lib/client', () => ({
  booking: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Booking Controller', () => {
  let app;
  let bookingCtrl;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    bookingCtrl = new bookingController();
    app.get('/bookings', bookingCtrl.getAllBooking);
    app.post('/bookings/:guideId', bookingCtrl.bookingExists, bookingCtrl.createBooking);
    app.put('/bookings/:bookingId', bookingCtrl.updateBooking);
    app.delete('/bookings/:bookingId', bookingCtrl.deleteBooking);
  });

  describe('Get All Bookings', () => {
    it('should return 500 if id is missing', async () => {
      const res = await request(app).get('/bookings');
      expect(res.body).toEqual(dataResponse(null, null, 500));
    });

    it('should return 404 if no bookings are found', async () => {
      booking.findMany.mockResolvedValue(null);
      const res = await request(app).get('/bookings').set('locals', { id: 1 });
      expect(res.body).toEqual(dataResponse(null, 'No review for this user exists', 404));
    });
  });

  describe('Create Booking', () => {
    it('should return 403 if fields are missing', async () => {
      const res = await request(app).post('/bookings/1').send({});
      expect(res.body).toEqual(dataResponse(null, 'All field are required', 403));
    });

    it('should return 409 if booking already exists', async () => {
      booking.findFirst.mockResolvedValue({ status: 'PENDING' });
      const res = await request(app).post('/bookings/1').send({ booking_date: '2025-01-01' });
      expect(res.body).toEqual(dataResponse(null, 'Booking already exists and is not completed', 409));
    });
  });

  describe('Update Booking', () => {
    it('should return 403 if bookingId is missing', async () => {
      const res = await request(app).put('/bookings/').send({});
      expect(res.body).toEqual(dataResponse(null, null, 403));
    });
  });

  describe('Delete Booking', () => {
    it('should return 403 if bookingId is missing', async () => {
      const res = await request(app).delete('/bookings/');
      expect(res.body).toEqual(dataResponse(null, null, 403));
    });
  });
});
