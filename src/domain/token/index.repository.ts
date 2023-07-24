import { PayloadUserTokenEntity } from "./index.entity";

export interface TokenRepository{
    generateUserToken(params:PayloadUserTokenEntity):string,
    verifyToken(token:string):PayloadUserTokenEntity|null
}