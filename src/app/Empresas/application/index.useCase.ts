import { LoggerRepository, LoggerValue } from "../../../domain/logger";
import { ResponseErrorValue, ResponseSuccessValue } from "../../../domain/responser";
import { ParamValidator } from "../../../domain/validator";
import { EmpresaEntity, EmpresaRepository, EmpresaValue } from "../domain";

export class EmpresaUseCase{
    constructor(private readonly repository:EmpresaRepository,
        private readonly logger:LoggerRepository){}
    public async getEmpresaBySubdominio(subdominio:string):Promise<ResponseSuccessValue|ResponseErrorValue>{
        try{
            
            const empresa= await this.repository.getEmpresaBySubdominio(subdominio)
            if(!empresa){
                const log=new LoggerValue({
                    message:"No se encontró la empresa",
                    object:{
                        subdominio:subdominio
                    },
                    status:"error"
                })
                this.logger.error(log)
                throw new Error("No se encontró la empresa")
            }
            const response=new ResponseSuccessValue({
                data:{
                    ...empresa
                },
                message:"Empresa encontrada exitosamente",
                status:true,
                title:"Empresa encontrada exitosamente"
            })
            return response
        }catch(e){
            const log=new LoggerValue({
                message:"Error en getEmpresaBySubdominio UseCase",
                status:"error",
                object:{
                    error:e
                }
            })
            this.logger.error(log)
            const err=e as Error
            const error=new ResponseErrorValue({
                title:"Error en getEmpresaBySubdominio UseCase",
                code:400,
                message:err.message??"Error no registrado",
                status:false,
                context:{
                    error:e
                }
            })
            return error
        }
    }
    public async createEmpresa(body:Omit<EmpresaEntity,"id"|"active">):Promise<ResponseSuccessValue|ResponseErrorValue>{
        try{
            const empresa=new EmpresaValue(body)
            const response=await this.repository.createEmpresa(empresa)
            if(!response){
                throw new Error("No se pudo crear la empresa")
            }
            const result=new ResponseSuccessValue({
                message:"Empresa creada exitosamente",
                title:"Empresa creada exitosamente",
                status:true,
                data:{
                    ...empresa
                }
            })
            return result
        }catch(e){
            const err=e as Error
            const error=new ResponseErrorValue({
                message:err.message??"Error no registrado",
                title:"Error en createEmpresa UseCase",
                code:400,
                status:false,
                context:{
                    error:e
                }
            })
            return error
        }
    }
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
            const response=new ResponseSuccessValue({
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
            const response=new ResponseErrorValue({
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
        const response=new ResponseErrorValue({
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
            const response=new ResponseErrorValue({
                message:"No se envió la data para crear la empresa",
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

        const response=new ResponseSuccessValue({
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
            const response=new ResponseErrorValue({
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
        const response=new ResponseErrorValue({
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