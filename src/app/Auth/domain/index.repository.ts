import { ResponseErrorValue, ResponseSuccessValue } from "../../../domain/responser";

export interface AuthRepository{
    login:()=>Promise<ResponseSuccessValue|ResponseErrorValue>
}