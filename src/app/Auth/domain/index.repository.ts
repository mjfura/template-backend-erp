import { ResponseErrorValue } from "../../../domain/responser";
import { LoginResponseEntity } from "./index.entity";
import { LoginCredentialsValue } from "./index.value";

export interface AuthRepository{
    login:(credentials:LoginCredentialsValue)=>Promise<LoginResponseEntity|ResponseErrorValue>
}