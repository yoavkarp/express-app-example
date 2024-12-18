import { App } from './app';
import { Database } from './db/database';
import { UsersRouter } from './routers/users.router';
import './utils/configEnv';

let mongodb = new Database();

mongodb.connect()
    .then(() => {
        let server = new App([new UsersRouter()]);
        server.listen();
    })
    .catch(err => {
        console.error(err);
    })