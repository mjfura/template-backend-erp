import { LoggerRepository } from "../../../domain/logger";
import { ResponseErrorValue, ResponseSuccessValue } from "../../../domain/responser";
import { EmpresaEntity, EmpresaRepository, EmpresaValue } from "../domain";

export class EmpresaUseCase{
    constructor(private readonly repository:EmpresaRepository,
        private readonly logger:LoggerRepository){}
    public async getEmpresaBySubdominio(subdominio:string):Promise<ResponseSuccessValue|ResponseErrorValue>{
        try{
            this.logger.info({
                message:"Iniciando getEmpresaBySubdominio UseCase"
            })
            const empresa= await this.repository.getEmpresaBySubdominio(subdominio)
            if(!empresa){
                this.logger.error({
                    message:"No se encontró la empresa",
                    object:{
                        subdominio:subdominio
                    }
                })
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
            this.logger.error(
                {
                    message:"Error en getEmpresaBySubdominio UseCase",
                    object:{
                        error:e
                    }
                }
            )
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
    public async createEmpresa(body:Omit<EmpresaEntity,"id">):Promise<ResponseSuccessValue|ResponseErrorValue>{
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
}