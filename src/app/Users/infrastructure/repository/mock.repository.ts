import { ResponseErrorValue } from "../../../../domain/responser";
import { ResponseUserEntity, UserEntity, UserRepository, UserValue, UserWithEmpresaEntity } from "../../domain";

export class MockRepository implements UserRepository {
    
    async createUser(body: UserValue): Promise<ResponseUserEntity | ResponseErrorValue> {
        try{
            const mockPromise=()=>new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(!body.correo || !body.password){
                        reject(new Error("Datos requeridos no enviados"))
                    }
                  const data:ResponseUserEntity = {
                   id:'1',
                   nombre:'Marco',
                   apellido:'Gonzalez',
                   correo:'XXXXXXXXXXXXXXXXXXX',
                   password:'XXXXXXXXXXXXXXXXXXX',
                   creado:new Date(),
                   modificado:new Date(),
                   permiso:'2',
                   empresa_id:'1',
                   active:true
                  };
                  resolve(data);
                
                }, 500); 
              });
              const newUser=await mockPromise() as ResponseUserEntity
              return newUser
            
            }
        catch(e){
            console.log("error ",e)
            const error=e as Error
            const responseError=new ResponseErrorValue({
                message:error.message??'Ha ocurrido un error al crear un usuario',
                title:'Error en Base de Datos',
                status:false,
                code:500,
                context:{
                    error
                }   

            })
            return responseError
        }
    }
    async getUserByEmpresaAndCorreo(empresa: string, correo: string): Promise<UserWithEmpresaEntity | ResponseErrorValue> {
        try{
            const mockPromise=()=>new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(!empresa || !correo){
                        reject(new Error("Datos requeridos no enviados"))
                    }
                  const data:UserWithEmpresaEntity = {
                   id:'1',
                   nombre:'Marco',
                   apellido:'Gonzalez',
                   correo:'XXXXXXXXXXXXXXXXXXX',
                   password:'XXXXXXXXXXXXXXXXXXX',
                   creado:new Date(),
                   modificado:new Date(),
                   permiso:'2',
                   empresa_id:'1',
                   active:true,
                   empresa:{
                       id:'1',
                       nombre:'Empresa 1',
                       subdominio:'empresa'
                   }
                  };
                  resolve(data);
                
                }, 500); 
            })
            const newUser=await mockPromise() as UserWithEmpresaEntity
            return newUser
        }catch(e){
            console.log("error ",e)
            const error=e as Error
            const responseError=new ResponseErrorValue({
                message:error.message??'Ha ocurrido un error al obtener el usuario',
                title:'Error en Base de Datos',
                status:false,
                code:500,
                context:{
                    error
                }
            })
            return responseError
        }
    }
    async editUser(id: string, params: Partial<UserEntity>): Promise<ResponseUserEntity | ResponseErrorValue> {
         try{
            const mockPromise=()=>new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(!id){
                        reject(new Error("ID de usuario no recibida"))
                    }
                  const data:ResponseUserEntity = {
                  apellido:params.apellido??'Gonzalez',
                  nombre:params.nombre??'Marco',
                  correo:params.correo??'XXXXXXXXXXXXXXXXXXX',
                  password:params.password??'XXXXXXXXXXXXXXXXXXX',
                  permiso:params.permiso??'2',
                  id,
                  creado:new Date(),
                  modificado:new Date()
                  };
                  resolve(data);
                
                }, 500); 
            })
            const newUser=await mockPromise() as ResponseUserEntity
            return newUser
        }catch(e){
            console.log("error ",e)
            const error=e as Error
            const responseError=new ResponseErrorValue({
                message:error.message??'Ha ocurrido un error al obtener el usuario',
                title:'Error en Base de Datos',
                status:false,
                code:500,
                context:{
                    error
                }
            })
            return responseError
        }
    }
    async getUsersByEmpresa(idEmpresa: string): Promise<ResponseUserEntity[] | ResponseErrorValue> {
        try{
            const mockPromise=()=>new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(!idEmpresa){
                        reject(new Error("Datos requeridos no enviados"))
                    }
                  const data:ResponseUserEntity[] =[ {
                   id:'1',
                   nombre:'Marco',
                   apellido:'Gonzalez',
                   correo:'XXXXXXXXXXXXXXXXXXX',
                   password:'XXXXXXXXXXXXXXXXXXX',
                   creado:new Date(),
                   modificado:new Date(),
                   permiso:'2',
                   empresa_id:'1',
                   active:true,
                  
                  }];
                  resolve(data);
                
                }, 500); 
            })
            const newUser=await mockPromise() as ResponseUserEntity[]
            return newUser
        }catch(e){
            console.log("error ",e)
            const error=e as Error
            const responseError=new ResponseErrorValue({
                message:error.message??'Ha ocurrido un error al obtener la lista de usuarios',
                title:'Error en Base de Datos',
                status:false,
                code:500,
                context:{
                    error
                }
            })
            return responseError
        }
    }
    
}