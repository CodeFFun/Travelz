const request = require('supertest');
const express = require('express');
const authController = require('../controller/authController');
const dataResponse = require('../lib/dataResponse');
const { user } = require('../lib/client');
const { comparePassword } = require('../middleware/hashPassword');
const { generateCookie } = require('../lib/cookie');

jest.mock('../lib/client', () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

jest.mock('../middleware/hashPassword', () => ({
  comparePassword: jest.fn(),
}));

jest.mock('../lib/cookie', () => ({
  generateCookie: jest.fn(),
}));

describe('Auth Controller', () => {
  let app;
  let auth;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    auth = new authController();
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
  });

  describe('Login', () => {
    it('should return 400 if email or password is missing', async () => {
      const res = await request(app).post('/login').send({});
      expect(res.body).toEqual(dataResponse(null, 'Not enough credentials', 400));
    });

    it('should return 404 if user is not found', async () => {
      user.findUnique.mockResolvedValue(null);
      const res = await request(app).post('/login').send({ email: 'test@test.com', password: 'password' });
      expect(res.body).toEqual(dataResponse(null, 'Username or password doesnt match', 404));
    });

    it("should return 403 if password doesn't match", async () => {
      user.findUnique.mockResolvedValue({ user_email: 'test@test.com', user_password: 'hashedpassword' });
      comparePassword.mockReturnValue(false);
      const res = await request(app).post('/login').send({ email: 'test@test.com', password: 'password' });
      expect(res.body).toEqual(dataResponse(null, "Username or password doesn't match", 403));
    });

    it('should return 200 and set cookie if login is successful', async () => {
      user.findUnique.mockResolvedValue({ user_id: 1, user_role: 'user', user_email: 'test@test.com', user_password: 'hashedpassword' });
      comparePassword.mockReturnValue(true);
      generateCookie.mockImplementation((userData, res) => res.cookie('token', 'mockedToken'));

      const res = await request(app).post('/login').send({ email: 'test@test.com', password: 'password' });
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe('User logged in sucessfully');
    });
  });

  describe('Logout', () => {
    it('should return 200 and clear cookie on logout', async () => {
      const res = await request(app).post('/logout');
      expect(res.body).toEqual(dataResponse(null, 'User logged out successfully', 200));
    });
  });
});
