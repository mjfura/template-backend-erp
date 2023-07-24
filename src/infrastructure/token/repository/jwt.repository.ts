import { JWT_SECRET } from "../../../config";
import { PayloadUserTokenEntity, TokenRepository } from "../../../domain/token";
import jwt, { Secret } from 'jsonwebtoken'
export class JwtRepository implements TokenRepository{
    generateUserToken(params: PayloadUserTokenEntity): string {
        return jwt.sign({
          ...params
        },
        JWT_SECRET as Secret,
        {
          expiresIn: '4h'
        })
    }
    verifyToken(token: string): PayloadUserTokenEntity|null {
      try {
        const data = jwt.verify(token, JWT_SECRET as Secret) as PayloadUserTokenEntity
        return data
      } catch (err) {
        return null
      }
    }
}