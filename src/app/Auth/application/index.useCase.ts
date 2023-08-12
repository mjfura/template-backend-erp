import { EncrypterRepository } from "../../../domain/encrypter"
import { ResponseErrorValue, ResponseSuccessValue } from "../../../domain/responser"
import { TokenRepository } from "../../../domain/token"
import { UserRepository } from "../../Users/domain"
import { LoginCredentialsEntity, LoginCredentialsValue } from "../domain"

export class AuthUseCase{
    constructor(
        private readonly userRepository:UserRepository,
        private readonly tokenRepository:TokenRepository,
        private readonly encrypter:EncrypterRepository){}
    
    public async login(body:LoginCredentialsEntity):Promise<ResponseSuccessValue|ResponseErrorValue>{
        try{
           const credentials=new LoginCredentialsValue({
                ...body
            })
            const user=await this.userRepository.getUserByEmpresaAndCorreo(credentials.idEmpresa,credentials.correo) as any
            if(user instanceof ResponseErrorValue){
                return user
            }
            console.log('user',user)
            // check password
            const isPasswordCorrect=await this.encrypter.compare(credentials.password,user.password)
            if(!isPasswordCorrect) throw new Error("Contraseña incorrecta")
            
           // generate token
            const token=this.tokenRepository.generateUserToken({
                id:user.id,
                idEmpresa:user.empresa_id??null,
                correo:user.correo,
                permiso:user.permiso
            })
           // update user
            const response=await this.userRepository.editUser(user.id,{
                lastLogin:new Date()
            })
            if(response instanceof ResponseErrorValue){
                return response
            }
            
            const result=new ResponseSuccessValue({
                message:"Usuario autenticado exitosamente",
                title:"Usuario autenticado exitosamente",
                status:true,
                data:{
                    correo:user.correo,
                    empresa_id:user.empresa_id??null,
                    empresa_nombre:user.empresa.nombre??null,
                    empresa_subdominio:user.empresa.subdominio??null,
                    permiso:user.permiso,
                    nombres:user.nombre+' '+user.apellido,
                    id:user.id,
                    token
                }
            })
            return result
        }catch(e){
            const err=e as Error
            console.log('error en useCase auth',err)
            const error=new ResponseErrorValue({
                message:err.message??"Error no registrado",
                title:"Error en login UseCase",
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