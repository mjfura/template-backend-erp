import { EncrypterRepository } from "../../../domain/encrypter";
import { LoggerRepository } from "../../../domain/logger"
import { ResponseErrorValue, ResponseSuccessValue } from "../../../domain/responser"
import { UserEntity, UserRepository, UserValue } from "../domain"
import { v4 as uuid } from "uuid";

export class UserUseCase{
    constructor(private readonly repository:UserRepository,
        private readonly logger:LoggerRepository,
        private readonly encrypter:EncrypterRepository){}
    
    public async createUser(body:Omit<UserEntity,'id'>):Promise<ResponseSuccessValue|ResponseErrorValue>{
        try{
            const hashPassword=await this.encrypter.encrypt(body.password)
            if(!hashPassword) throw new Error('La contraseña no pudo ser cifrada correctamente, intente nuevamente o contacte con el administrador del sistema')
            const user=new UserValue({
                ...body,
                password:hashPassword,
                id:uuid()
            })
            const response=await this.repository.createUser(user)
            if(response instanceof ResponseErrorValue){
                return response
            }
            
            const result=new ResponseSuccessValue({
                message:"Usuario creado exitosamente",
                title:"Usuario creado exitosamente",
                status:true,
                data:{
                    ...response
                }
            })
            return result
        }catch(e){
            const err=e as Error
            this.logger.error({
                object:{
                    error:err
                },
                message:"Error en createUser UseCase"
            })
            const error=new ResponseErrorValue({
                message:err.message??"Error no registrado",
                title:"Error en createUser UseCase",
                code:400,
                status:false,
                context:{
                    error:e
                }
            })
            return error
        }
    }
    public async getUsersByEmpresa(idEmpresa:string):Promise<ResponseSuccessValue|ResponseErrorValue>{
        try{
            const response=await this.repository.getUsersByEmpresa(idEmpresa)
            if(response instanceof ResponseErrorValue) return response
            const result=new ResponseSuccessValue({
                message:"Usuarios obtenidos exitosamente",
                title:"Usuarios obtenidos exitosamente",
                status:true,
                data:{
                    usuarios:response
                }
            })
            return result
        }catch(e){
            const err=e as Error
            this.logger.error({
                object:{
                    error:err
                },
                message:"Error en createUser UseCase"
            })
            const error=new ResponseErrorValue({
                message:err.message??"Error no registrado",
                title:"Error en getUsersByEmpresa UseCase",
                code:400,
                status:false,
                context:{
                    error:e
                }
            })
            return error
        }
    }
    public async getUserById(idUser:string):Promise<ResponseSuccessValue|ResponseErrorValue>{
        try{
            const response=await this.repository.getUserById(idUser)
            if(response instanceof ResponseErrorValue) return response
            const result=new ResponseSuccessValue({
                message:"Usuarios obtenidos exitosamente",
                title:"Petición exitosa",
                status:true,
                data:{
                    usuario:response
                }
            })
            return result
        }catch(e){
            const err=e as Error
            this.logger.error({
                object:{
                    error:err
                },
                message:"Error en getUser UseCase"
            })
            const error=new ResponseErrorValue({
                message:err.message??"Error no registrado",
                title:"Error en getUsersById UseCase",
                code:400,
                status:false,
                context:{
                    error:e
                }
            })
            return error
        }
    }
    public async editUser(idUser:string,body:Partial<Omit<UserEntity,'id'>>):Promise<ResponseSuccessValue|ResponseErrorValue>{
        try{
            const response=await this.repository.editUser(idUser,body)
            if(response instanceof ResponseErrorValue) return response
            const result=new ResponseSuccessValue({
                message:"Usuario eliminado exitosamente",
                title:"Registro eliminado",
                status:true,
                data:{
                    ...response
                }
                }
            )
            return result
        }catch(e){
            const err=e as Error
            this.logger.error({
                object:{
                    error:err
                },
                message:"Error en editUser UseCase"
            })
            const error=new ResponseErrorValue({
                message:err.message??"Error no registrado",
                title:"Error en editUser UseCase",
                code:400,
                status:false,
                context:{
                    error:e
                }
            })
            return error
        
        }
    }
}