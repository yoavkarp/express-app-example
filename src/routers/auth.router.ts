import { Router } from "../router";
import { AuthController } from "../controllers/auth.controller";
import { checkAccessToken, checkRefreshToken, passport } from "../middleware/passport.middleware";

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
        this.router.post('/refresh', checkAccessToken, checkRefreshToken, this.AuthController.refreshToken)
        this.router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
            res.json({ message: 'You have accessed a protected route!', user: req.user });
        });
    }
}