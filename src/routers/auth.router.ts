import { Router } from "../router";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter extends Router {
    readonly AuthController: AuthController;

    constructor() {
        super('/auth');
        this.AuthController = new AuthController();

        this.setRoutes();
    }

    setRoutes() {
        this.router.post('/login', this.AuthController.loginWithPhoneNumber);
        this.router.post('/verify-otp', this.AuthController.verifyOtp);
    }
}