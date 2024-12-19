import { App } from './app';
import { Database } from './db/database';
import { AuthRouter } from './routers/auth.router';
import { UsersRouter } from './routers/users.router';
import './utils/configEnv';

let mongodb = new Database();

mongodb.connect()
    .then(() => {
        let server = new App([new UsersRouter(), new AuthRouter()]);
        server.listen();
    })
    .catch(err => {
        console.error(err);
    })