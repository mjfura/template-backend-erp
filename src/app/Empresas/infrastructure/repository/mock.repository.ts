import { ResponseErrorValue } from "../../../../domain/responser"
import { EmpresaEntity, EmpresaRepository, EmpresaValue } from "../../domain"

export class MockRepository implements EmpresaRepository {
    getEmpresas(): Promise<ResponseErrorValue | EmpresaValue[]> {
        throw new Error("Method not implemented.")
    }
    async createEmpresa(body: EmpresaValue): Promise<EmpresaEntity | null> {
        try{
            const mockPromise=()=>new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(!body.subdominio || !body.nombre){
                        reject(new Error("Datos requeridos no enviados"))
                    }
                  const data = {
                    id: 1,
                    nombre: body.nombre,
                    subdominio: body.subdominio,
                    active: true,
                    correo:body.correo,
                    telefono:body.telefono,
                    logo:body.logo,
                    description:body.description,
                    creado:new Date(),
                    modificado:new Date()
                  };
                  resolve(data);
                
                }, 500); 
              });
              const newEmpresa=await mockPromise() as EmpresaEntity
              return newEmpresa
            }
        catch(e){
            console.log("error ",e)
            return null
        }
    }
    async getEmpresaBySubdominio(subdominio: string): Promise<EmpresaEntity | null> {
        try{
            const mockPromise=(subdominio:string)=>new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    if(!subdominio || subdominio==="demo"){
                        reject(new Error("Subdominio no enviado"))
                    }
                    const data={
                        id: 1,
                        nombre: "Empresa 1",
                        subdominio,
                        active: true,
                        correo:"micorreo",
                        telefono:"123456789",
                        logo:"logo",
                        description:"description",
                        creado:new Date(),
                        modificado:new Date()
                    }
                    resolve(data)
                },500)
            })
            const response= await mockPromise(subdominio) as EmpresaEntity
            return response
        }catch(e){
            return null
        }
    }
    
}