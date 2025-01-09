import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithoutRequest } from 'passport-jwt';
import { UsersService } from '../../src/services/users.service';
import { auth } from '../../src/auth/auth';

passport.use(
    'otp',
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: auth.getKeys().AccessToken.privateKey, // Use a secure secret and store it safely
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
        secretOrKey: auth.getKeys().RefreshToken.privateKey, // Refresh token secret
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

export { passport }