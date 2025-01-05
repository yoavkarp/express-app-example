import '../utils/configEnv';
import { App } from "../app";
import { Database } from "../db/database";
import { UsersRouter } from "../routers/users.router";
import supertest from 'supertest'
import { ActionLogModel } from '../models/actionLog.model';
import { AuthRouter } from '../routers/auth.router';

let database = new Database();
let server = new App([new UsersRouter(), new AuthRouter()]);

beforeAll(async () => {
    await server.start();
    await ActionLogModel.deleteMany({ entity: "User" }).exec()
})

afterAll(async () => {
    server.close();
})

describe('Auth Controller', () => {

    let test = supertest(server.app);

    it('should send otp', async () => {
        let response = await test.post('/auth/login').send({
            phone_number: "+9720505716749"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    })

    it('should login with otp', async () => {
        let response = await test.post('/auth/verify-otp').send({
            phone_number: "+9720505716749",
            otp: "123456"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
    })
})