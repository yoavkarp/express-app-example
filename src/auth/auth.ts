import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

type RSAKeys = {
    privateKey: string;
    publicKey: string;
}
type AuthKeys = {
    AccessToken: RSAKeys;
    RefreshToken: RSAKeys;
}

const KEYS_DIR = 'src/auth/keys';

class Auth {

    private static instance: Auth;

    private readonly Keys: AuthKeys;

    private constructor() {
        this.Keys = {
            AccessToken: {
                privateKey: fs.readFileSync(path.join(KEYS_DIR, "access_token_private_key.pem"), 'utf-8'),
                publicKey: fs.readFileSync(path.join(KEYS_DIR, "access_token_public_key.pem"), 'utf-8')
            },
            RefreshToken: {
                privateKey: fs.readFileSync(path.join(KEYS_DIR, "refresh_token_private_key.pem"), 'utf-8'),
                publicKey: fs.readFileSync(path.join(KEYS_DIR, "refresh_token_public_key.pem"), 'utf-8')
            }
        }
    }

    public static getInstance(): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth();
        }
        return Auth.instance;
    }

    public generateAccessToken(userId: string) {
        const token = jwt.sign({ id: userId }, this.Keys.AccessToken.privateKey, { expiresIn: '1h', algorithm: 'RS256' });
        return token;
    }

    public generateRefreshToken(userId: string) {
        const token = jwt.sign({ id: userId }, this.getKeys().RefreshToken.privateKey, { expiresIn: '7d', algorithm: 'RS256' });
        return token;

    }

    public verifyAccessKey(token: string) {
        return jwt.verify(token, this.Keys.AccessToken.privateKey, { algorithms: ['RS256'] });
    }

    public verifyRefreshKey(token: string) {
        return jwt.verify(token, this.Keys.RefreshToken.privateKey, { algorithms: ['RS256'] });
    }

    public getKeys() {
        return this.Keys;
    }
}

export const auth = Auth.getInstance();