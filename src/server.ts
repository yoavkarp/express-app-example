import { App } from './app';
import { Database } from './db/database';
import { Router } from './router';
import { AuthRouter } from './routers/auth.router';
import { TestRouter } from './routers/test.router';
import { UsersRouter } from './routers/users.router';
import './utils/configEnv';

let mongodb = new Database();
const routers: Router[] = [new UsersRouter(), new AuthRouter()];
if (process.env.NODE_ENV === 'development') {
    routers.push(new TestRouter());
}

mongodb.connect()
    .then(() => {
        let server = new App(routers);
        server.listen();
    })
    .catch(err => {
        console.error(err);
    })