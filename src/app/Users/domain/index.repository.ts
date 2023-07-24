import { ResponseErrorValue } from "../../../domain/responser";
import { ResponseUserEntity, UserEntity } from "./index.entity";

export interface UserRepository{
    createUser(params:UserEntity):Promise<any|ResponseErrorValue>,
    getUserByEmpresaAndCorreo(empresa:string,correo:string):Promise<ResponseUserEntity|ResponseErrorValue>,
    
}