import '../utils/configEnv';
import { Database } from "../db/database";

let database: Database | null = null;

afterAll(() => {
    database?.connection?.close();
})

describe('Database', () => {

    it('should connect to database', async () => {
        database = new Database();
        let response = await database.connect();
        expect(response.readyState).toBe(1);
    })

})