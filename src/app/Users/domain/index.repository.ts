import { ResponseErrorValue } from "../../../domain/responser";
import { ResponseUserEntity, UserEntity, UserWithEmpresaEntity } from "./index.entity";

export interface UserRepository{
    createUser(params:UserEntity):Promise<any|ResponseErrorValue>,
    getUserByEmpresaAndCorreo(empresa:string,correo:string):Promise<UserWithEmpresaEntity|ResponseErrorValue>,
    editUser(id:string,params:Partial<UserEntity>):Promise<ResponseUserEntity|ResponseErrorValue>,
    getUsersByEmpresa(idEmpresa:string):Promise<ResponseUserEntity[]|ResponseErrorValue>
}