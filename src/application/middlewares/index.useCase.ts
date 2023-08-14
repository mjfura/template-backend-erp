import { ResponseErrorValue, ResponseSuccessValue, ResponserRepository } from "../../domain/responser";
import { TokenRepository } from "../../domain/token";
import { ParamValidator } from "../../domain/validator";

export class MiddlewareUseCase{
    constructor(private readonly responser:ResponserRepository,private readonly token:TokenRepository){}
    public validateQueryParams(params:Record<string,unknown>,requiredParams:Array<ParamValidator>):ResponseSuccessValue|ResponseErrorValue{
        let arrayMessages:string[]=[]
        requiredParams.forEach((val)=>{
            const {message,selector}=val
            if(selector in params && params[selector]){
                return;
            }
            arrayMessages.push(message)
        })
        if(arrayMessages.length===0){
            const response=this.responser.sendSuccess({
                data:{
                    ...params
                },
                message:"Parámetros validados correctamente",
                status:true,
                title:"Validación exitosa"
            })
            return response
        }
        if(arrayMessages.length===1){
            const response=this.responser.sendError({
                message:arrayMessages[0],
                title:"Error en validación de parámetros",
                code:400,
                status:false,
                context:{
                    params:params
                }
            })
            return response
        }
        const response=this.responser.sendError({
            message:"Error en validación de parámetros",
            title:"Error en validación de parámetros",
            code:400,
            status:false,
            context:{
                messages:arrayMessages
                }
        })
        return response
    }
    public validateBodyParams(requiredParams:Array<ParamValidator>,params?:Record<string,unknown>):ResponseSuccessValue|ResponseErrorValue{
        if(!params || Object.keys(params).length === 0){
            const response=this.responser.sendError({
                message:"No se envió la data en el body",
                title:"Error en validación del body",
                code:400,
                status:false,
                context:{
                    params
                }
            })
            return response
        }
        let arrayMessages:string[]=[]
        requiredParams.forEach((val)=>{
            const {message,selector}=val
            if(selector in params && params[selector]){
                return;
            }
            arrayMessages.push(message)
        })
        if(arrayMessages.length===0){

        const response=this.responser.sendSuccess({
            data:{
                ...params
            },
            message:"Body validado correctamente",
            status:true,
            title:"Validación exitosa"
        })
        return response
        }
        if(arrayMessages.length===1){
            const response=this.responser.sendError({
                message:arrayMessages[0],
                title:"Error en validación del body",
                code:400,
                status:false,
                context:{
                    messages:arrayMessages
                }
            })
            return response
        }
        const response=this.responser.sendError({
            message:"No se enviaron los campos requeridos",
            title:"Error en validación del body",
            code:400,
            status:false,
            context:{
                messages:arrayMessages
                }
        })
        return response
    }
    public isAuth(auth:string):ResponseSuccessValue|ResponseErrorValue{
        if (auth == null){
            return this.responser.sendError({
                message:'No se envió el token',
                title:'Usuario no autenticado',
                code:401,
                status:false
            })
        }
            const token = auth.split(' ').pop()
            if (token === undefined){
                return this.responser.sendError({
                    message:'El token enviado es inválido',
                    title:'Usuario no autenticado',
                    code:401,
                    status:false
                })
            }
            const tokenData = this.token.verifyToken(token)
            if(!tokenData){
                return this.responser.sendError({
                    message:'El token enviado es inválido',
                    title:'Usuario no autenticado',
                    code:401,
                    status:false
                })
            }
            return this.responser.sendSuccess({
                title:'Usuario autenticado',
                message:'Usuario autenticado',
                status:true,
                data:{
                    token
                }
            })

    }
    public isRoleAuth(token:string,permisos:string[]):ResponseSuccessValue|ResponseErrorValue{
        
    const tokenData = this.token.verifyToken(token)
    if (tokenData == null) {
      return this.responser.sendError({
        message: 'Token inválido',
        title: 'Usuario no autenticado',
        code: 401,
        status: false
      })
    }
    if (!permisos.includes(tokenData.permiso)) {
      
        return this.responser.sendError({
          message: 'No tiene permisos para realizar esta acción',
          title:'Usuario no autorizado',
          code: 409,
          status: false
        
        })
    }
    return this.responser.sendSuccess({
        title:'Usuario autorizado',
        message:'Permiso autorizado',
        status:true,
        data:{}
    })
  

    }
}