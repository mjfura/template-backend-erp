import { ResponseErrorValue } from "../../../domain/responser";
import { UserEntity } from "./index.entity";

export interface UserRepository{
    createUser(params:UserEntity):Promise<any|ResponseErrorValue>
}