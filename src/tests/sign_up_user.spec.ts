import { describe } from 'node:test';
import * as supertest from 'supertest';

const request = supertest('http://localhost:8001/api/v1'); // Adjust the URL as needed

describe('User Sign Up', () => {
    describe('Positive testing', () => {
        it('should sign up a new user successfully', async () => {
            const userData = {
                name: "John Doe",
                email: "john14@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123",
                role: "user"
            };
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body.message);
            console.log(res.body);
            expect(res.status).toBe(201); // Check if the status code is 201 Created
            expect(res.body.status).toBe("success"); // Check if the response has a success status
        });
    })
    describe('Negative testing', () => {
        it('should sign up a new user successfully', async () => {
            const userData = {
                name: "John Doe",
                email: "john14@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123",
                role: "user"
            };
            console.log(userData);
            const res = await request.post('/users/signup').send(userData);
            console.log(res.body);
        });
    })
});