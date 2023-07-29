import { ResponseErrorValue, ResponseSuccessValue, ResponserRepository } from "../../domain/responser";
import { ParamValidator } from "../../domain/validator";

export class MiddlewareUseCase{
    constructor(private readonly responser:ResponserRepository){}
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
}