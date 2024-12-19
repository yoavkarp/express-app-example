import '../utils/configEnv';
import { App } from "../app";
import { Database } from "../db/database";
import { UsersRouter } from "../routers/users.router";
import supertest from 'supertest'
import { ActionLogModel } from '../models/actionLog.model';

let database = new Database();
let server = new App([new UsersRouter()]);

beforeAll(async () => {
    await database.connect();
    server.listen();
    await ActionLogModel.deleteMany({ entity: "User" }).exec()
})

afterAll(async () => {
    server.close();
    database.connection?.close();
})

describe('Users Controller', () => {

    let test = supertest(server.app);
    let userId = '';

    it('should create a user', async () => {
        let response = await test.post('/users').send({
            name: 'John Doe',
            email: 'yoavkarp@gmail.com',
            phone_number: "+9720505716749"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');

        userId = response.body._id;

    })

    it('should get a user by id', async () => {
        let response = await test.get(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
    })

    it('should update a user by id', async () => {
        let response = await test.put(`/users/${userId}`).send({
            name: "Yoav Karp"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
    })

    // it('should delete a user by id', async () => {
    //     let response = await test.delete(`/users/${userId}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('message');
    // })
})