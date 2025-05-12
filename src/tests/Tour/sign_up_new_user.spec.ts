import { describe } from 'node:test';
import * as supertest from 'supertest';
import {faker} from '@faker-js/faker';
const request = supertest('http://localhost:8001/api/v1'); 
import {Response} from 'supertest';
interface UserData {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

describe('User Sign Up', () => {
    describe('Positive testing', () => {
        it.only('should sign up a new user successfully', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "test1234",
                passwordConfirm: "test1234",
            };
            console.log(userData);
            try {
                const res = await request.post('/users/signup').send(userData).expect(201); 
                console.log(res.body);
                expect(res.body.status).toBe("success");
                expect(res.body.data.user.name).toBe(userData.name);
                expect(typeof res.body.data.user.name).toBe("string");
                expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                expect(typeof res.body.data.user.email).toBe("string");
                expect(res.body.token).toBeDefined();
                expect(typeof res.body.token).toBe("string")
        // Additional checks for user object
                expect(res.body.data.user).toHaveProperty("_id");
                expect(res.body.data.user).not.toHaveProperty("password");
            } catch (error) {
                console.error('Error during sign up:', error);
                throw error; 
            }
        });
    })
    describe('Positive testing with .then', () => {
        it('should sign up a new user successfully', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "test1234",
                passwordConfirm: "test1234",
            };
            console.log(userData);
            //Make the POST request using .then
            return request
            .post('/users/signup')
            .send(userData)
            .expect(201) 
            .then((res) => {
                expect(res.body.status).toBe("success");
                expect(res.body.data.user.name).toBe(userData.name);
                expect(typeof res.body.data.user.name).toBe("string");
                expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                expect(typeof res.body.data.user.email).toBe("string");
                expect(res.body.token).toBeDefined();
                expect(typeof res.body.token).toBe("string")
                // Additional checks for user object
                expect(res.body.data.user).toHaveProperty("_id");
                expect(res.body.data.user).not.toHaveProperty("password");
            })
            .catch((error) => {
                console.error('Error during sign up:', error);
                throw error; 
            });
        });
    })
    describe('Positive testing with .end', () => {
        it('should sign up a new user successfully', (done) => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "test1234",
                passwordConfirm: "test1234",
            };
            console.log(userData);
            //Make the POST request using .then
            request
            .post('/users/signup')
            .send(userData)
            .expect(201) 
            .end((err:Error | null, res:Response) => {
                if (err) {
                    console.error('Error during sign up:', err);
                    return done(err); 
                }
                try {
                expect(res.body.status).toBe("success");
                expect(res.body.data.user.name).toBe(userData.name);
                expect(typeof res.body.data.user.name).toBe("string");
                expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                expect(typeof res.body.data.user.email).toBe("string");
                expect(res.body.token).toBeDefined();
                expect(typeof res.body.token).toBe("string")
                // Additional checks for user object
                expect(res.body.data.user).toHaveProperty("_id");
                expect(res.body.data.user).not.toHaveProperty("password");
                done()
             } catch(err) {
                console.error('Error during sign up:', err);
                done(err);     
               }
            });
        });
    })
})