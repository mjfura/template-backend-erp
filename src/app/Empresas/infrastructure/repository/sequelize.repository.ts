import { ResponseErrorValue } from "../../../../domain/responser"
import { EmpresaEntity, EmpresaRepository, EmpresaValue } from "../../domain"
import { EmpresaModel } from "../model"

export class SequelizeRepository implements EmpresaRepository {
    getEmpresas(): Promise<ResponseErrorValue | EmpresaValue[]> {
        throw new Error("Method not implemented.")
    }
    async createEmpresa(body: EmpresaValue): Promise<EmpresaEntity | null> {
        try{
            const newEmpresa=await EmpresaModel.create(body)
            return newEmpresa
        }catch(e){
            console.log("error ",e)
            return null
        }
    }
    async getEmpresaBySubdominio(subdominio: string): Promise<EmpresaEntity | null> {
        try{
            const response= await EmpresaModel.findOne({
                where:{
                    subdominio,
                    active:true
                }
            })
            if(!response)throw new Error("Archivo no registrado")
            return response.dataValues
        }catch(e){
            return null
        }
    }
    
}