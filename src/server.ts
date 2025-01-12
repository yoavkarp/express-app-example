import './utils/configEnv';
import { App } from './app';
import { Router } from './router';
import { AuthRouter } from './routers/auth.router';
import { TestRouter } from './routers/test.router';
import { UsersRouter } from './routers/users.router';
import { WorkoutRouter } from './routers/workout.router';

const routers: Router[] = [new UsersRouter(), new AuthRouter(), new WorkoutRouter()];
if (['development', 'test', undefined].includes(process.env.NODE_ENV)) {
    routers.push(new TestRouter());
}

let server = new App(routers);
server.start();