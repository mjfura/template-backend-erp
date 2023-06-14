import { ResponseErrorValue } from "../../../domain/responser";
import { EmpresaValue } from "./index.value";

export interface EmpresaRepository{
    getEmpresas():Promise<Array<EmpresaValue>|ResponseErrorValue>
    getEmpresaBySubdominio(subdominio:string):Promise<EmpresaValue|null>
    createEmpresa(body:EmpresaValue):Promise<EmpresaValue|null>
}