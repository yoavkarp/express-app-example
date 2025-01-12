import { Router } from "../router";
import { AuthController } from "../controllers/auth.controller";
import { gymcoreJwtRefreshToken, gymcoreJwtAuth, passport } from "../middleware/passport.middleware";

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
        this.router.post('/refresh', gymcoreJwtRefreshToken, this.AuthController.refreshToken)
        this.router.get('/protected', gymcoreJwtAuth, (req, res) => {
            res.json({ message: 'You have accessed a protected route!', user: req.user });
        });
    }
}