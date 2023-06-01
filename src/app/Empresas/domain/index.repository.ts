import { EmpresaEntity } from "./index.entity";

export interface EmpresaRepository{
    getEmpresas(id:string):Promise<Array<EmpresaEntity>>
}