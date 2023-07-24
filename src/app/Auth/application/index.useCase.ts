import { EncrypterRepository } from "../../../domain/encrypter"
import { ResponseErrorValue, ResponseSuccessValue } from "../../../domain/responser"
import { TokenRepository } from "../../../domain/token"
import { UserRepository } from "../../Users/domain"
import { AuthRepository, LoginCredentialsEntity, LoginCredentialsValue } from "../domain"

export class AuthUseCase{
    constructor(private readonly repository:AuthRepository,
        private readonly userRepository:UserRepository,
        private readonly tokenRepository:TokenRepository,
        private readonly encrypter:EncrypterRepository){}
    
    public async login(body:LoginCredentialsEntity):Promise<ResponseSuccessValue|ResponseErrorValue>{
        try{
           const credentials=new LoginCredentialsValue({
                ...body
            })
            const user=await this.userRepository.getUserByEmpresaAndCorreo(credentials.idEmpresa,credentials.correo)
            if(user instanceof ResponseErrorValue){
                return user
            }
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
            const response=await this.repository.login(credentials)
            if(response instanceof ResponseErrorValue){
                return response
            }
            
            const result=new ResponseSuccessValue({
                message:"Usuario autenticado exitosamente",
                title:"Usuario autenticado exitosamente",
                status:true,
                data:{
                    ...response
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