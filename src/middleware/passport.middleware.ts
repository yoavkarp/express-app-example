import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../services/users.service';

passport.use(
    'jwt',
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
    'refresh-token',
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

export const checkAccessToken = passport.authenticate('jwt', { session: false });
export const checkRefreshToken = passport.authenticate('refresh-token', { session: false });
export { passport }