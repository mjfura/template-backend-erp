import { ResponseErrorValue } from "../../../../domain/responser"
import { EmpresaEntity, EmpresaRepository, EmpresaValue } from "../../domain"
import { EmpresaModel } from "../model"

export class SequelizeRepository implements EmpresaRepository {
    getEmpresas(): Promise<ResponseErrorValue | EmpresaValue[]> {
        throw new Error("Method not implemented.")
    }
    async createEmpresa(body: Omit<EmpresaValue,"creado"|"modificado">): Promise<EmpresaEntity | null> {
        try{
            const newEmpresa=await EmpresaModel.create(body)
            return newEmpresa
        }catch(e){
            return null
        }
    }
    async getEmpresaBySubdominio(subdominio: string): Promise<EmpresaEntity | null> {
        try{
            const empresa= await EmpresaModel.findOne({
                where:{
                    subdominio
                }
            })
            if(!empresa)throw new Error("Archivo no registrado")
            return empresa
        }catch(e){
            return null
        }
    }
    
}