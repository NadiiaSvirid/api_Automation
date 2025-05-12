import { User } from "../../helper/interface";
import { deleteFunction, deleteFunction2, getUser, login, login2, signUp, signUp2 } from "../../helper/user";
import * as supertest from 'supertest';
const request = supertest("http://localhost:8001/api/v1");

describe('USER SIGNUP AND LOGIN', () => {
    const user: User = getUser("admin")
    let cookie: string;
    describe('Positive testing', () => {

        //async, try and catch
        it('should log in a user and delete the user', async () => {
            try {
                const res = await signUp(user);
                expect(res.statusCode).toBe(201);
                expect(res.body.data.user.email).toEqual(user.email);
                expect(res.body.status).toEqual("success");

                const loginRes = await login(user)
                expect(loginRes.statusCode).toBe(200);
                expect(loginRes.body.status).toBe("success");
                console.log(loginRes.body);
                cookie = loginRes.headers['set-cookie'][0].split(';')[0];
                //delete user
                const deleteRes = await deleteFunction(cookie);
                expect(deleteRes.statusCode).toBe(200);
                expect(deleteRes.body.message).toBe("User deleted successfully");
                const loginAfterDelete = await login(user);
                expect(loginAfterDelete.statusCode).toBe(401);
                expect(loginAfterDelete.body.message).toBe("Incorrect email or password");


            } catch (error) {
                console.error('Error during sign up:', error);
                throw error;
            }
        })

        it.only('shoud signUp, login and delete the user using .then()', () => {
            return signUp(user)
                .then((res) => {
                    console.log(res.body);
                    expect(res.statusCode).toBe(201);
                    expect(res.body.data.user.email).toEqual(user.email);
                    expect(res.body.status).toEqual("success");
                    return login(user)

                })
                .then((loginRes) => {
                    console.log(loginRes.body, "loginRes");
                    expect(loginRes.statusCode).toBe(200);
                    expect(loginRes.body.status).toBe("success");
                    console.log("cookie", loginRes.headers['set-cookie'][0]);
                    cookie = loginRes.headers['set-cookie'][0].split(';')[0];
                    return deleteFunction(cookie)
                })
                .then(deleteRes => {
                    console.log(deleteRes.body, "deleteRes");
                    expect(deleteRes.statusCode).toBe(200);
                    expect(deleteRes.body.message).toBe("User deleted successfully");
                    return login(user)
                })
                .then(loginAfterDelete => {
                    expect(loginAfterDelete.statusCode).toBe(401);
                    expect(loginAfterDelete.body.message).toBe("Incorrect email or password");
                })
        });
        it('using .end', (done) => {
            signUp2(user)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.body);
                    expect(res.statusCode).toBe(201);
                    expect(res.body.data.user.email).toEqual(user.email);
                    expect(res.body.status).toEqual("success");
                    login2(user)
                        .end((err, loginRes) => {
                            if (err) return done(err);
                            expect(loginRes.statusCode).toBe(200);
                            expect(loginRes.body.status).toBe("success");
                            console.log("cookie", loginRes.headers['set-cookie'][0]);
                            cookie = loginRes.headers['set-cookie'][0].split(';')[0];
                            deleteFunction2(cookie)
                                .end((err, deleteRes) => {
                                    if (err) return done(err);
                                    console.log(deleteRes.body, "deleteRes");
                                    expect(deleteRes.statusCode).toBe(200);
                                    expect(deleteRes.body.message).toBe("User deleted successfully");
                                    login2(user)
                                        .end((err, loginAfterDelete) => {
                                            if (err) return done(err);
                                            expect(loginAfterDelete.statusCode).toBe(401);
                                            expect(loginAfterDelete.body.message).toBe("Incorrect email or password");
                                            done();
                                        })
                                })
                        })

                })
        })
    })
})
