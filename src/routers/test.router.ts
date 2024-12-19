import { Router } from "../router";
import { AuthController } from "../controllers/auth.controller";

export class TestRouter extends Router {

    constructor() {
        super('/test');
        this.setRoutes();
    }

    setRoutes() {
        this.router.get('/', (req, res) => {
            if (req.isAuthenticated())
                res.json({ message: req.user });
            else {
                res.json({ message: 'Not authenticated' });
            }
        });
    }
}