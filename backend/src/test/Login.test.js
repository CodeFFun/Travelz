jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => ({
            user: {
                findUnique: jest.fn(),
            },
        })),
    };
});

const request = require('supertest');
const app = require('../index.js'); // Adjust path accordingly
const { PrismaClient } = require('@prisma/client');
const { comparePassword } = require('../middleware/hashPassword');

const prisma = new PrismaClient(); // Mocked instance
jest.mock('../middleware/hashPassword');

describe('POST /auth/login', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 404 for incorrect password', async () => {
        const mockUser = {
            user_id: 1,
            user_email: 'test@example.com',
            user_password: 'hashedpassword',
            user_role: 'user'
        };

        prisma.user.findUnique.mockResolvedValue(mockUser);
        comparePassword.mockReturnValue(false);

        
        const response = await request(app)
        .post('/auth/login')
        .set('Content-Type', 'application/json') // Ensure correct headers
        .send({ email: 'test@example.com', password: 'correctpassword' });
    
        expect(response.body.status).toBe(404);
        expect(response.body.message).toBe("Username or password doesnt match");
    });

    test('should return 404 if user does not exist', async () => {
        prisma.user.findUnique.mockResolvedValue(null);

    const response = await request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json') // Ensure correct headers
    .send({ email: 'test@example.com', password: 'correctpassword' });

        console.log(response.body);
        expect(response.body.status).toBe(404);
        expect(response.body.message).toBe("No user exists");
    });

    test('should return 400 for missing credentials', async () => {
        const response = await request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json') // Ensure correct headers
    .send({ email: 'test@example.com', password: 'correctpassword' });


        expect(response.body.status).toBe(404);
        expect(response.body.message).toBe('Not enough credentials');
    });
});
