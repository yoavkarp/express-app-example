import { Router } from "../router";
import { AuthController } from "../controllers/auth.controller";
import { passport } from "../middleware/passport.middleware";
import { auth } from "../auth/auth";

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
        this.router.get('/', this.AuthController.getSession);
        this.router.post('/refresh', passport.authenticate('refresh-token', { session: false }), (req, res) => {
            console.log(req.user!._id)
            const accessToken = auth.generateAccessToken(req.user!._id);
            res.json({ accessToken });
        })
        this.router.get('/protected', passport.authenticate('otp', { session: false }), (req, res) => {
            res.json({ message: 'You have accessed a protected route!', user: req.user });
        });
    }
}