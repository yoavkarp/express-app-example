import passport, { AuthenticateCallback } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../services/users.service';
import { RequestHandler } from 'express';

passport.use(
    'gymcore-jwt',
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_PRIVATE_KEY || "", // Use a secure secret and store it safely
        algorithms: ['RS256']
    },
        async (jwtPayload, done) => {
            const usersService = new UsersService();
            try {
                const user = await usersService.getUserById(jwtPayload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        })
)

passport.use(
    'gymcore-jwt-refresh',
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
        secretOrKey: process.env.REFRESH_TOKEN_PRIVATE_KEY || "", // Refresh token secret
        algorithms: ['RS256']
    },
        async (jwtPayload, done) => {
            const usersService = new UsersService();
            try {
                const user = await usersService.getUserById(jwtPayload.id);
                return done(null, user);
            }
            catch (err) {
                return done(err, false);
            }
        }
    ));



type Strategy = 'gymcore-jwt' | 'gymcore-jwt-refresh';
const authenticate: (strategy?: Strategy) => RequestHandler = (strategy = 'gymcore-jwt') => (req, res, next) => {

    const callback: AuthenticateCallback = (err, user, info, status) => {
        if (err) {
            console.error(err);
            throw err;
        }
        if (!user) {
            throw new Error('User not found');
        }
        next();
    }

    passport.authenticate(strategy, { session: false }, callback)(req, res, next)
}

export const gymcoreJwtAuth = authenticate();
export const gymcoreJwtRefreshToken = authenticate('gymcore-jwt-refresh');
export { passport }