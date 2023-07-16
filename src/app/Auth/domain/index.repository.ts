import { ResponseErrorValue } from "../../../domain/responser";

export interface AuthRepository{
    login:()=>Promise<any|ResponseErrorValue>
}