import { ResponseErrorValue } from "../../../../domain/responser"
import { ResponseUserEntity, UserRepository, UserValue } from "../../domain"
import { UserModel } from "../model"

export class SequelizeRepository implements UserRepository {
    
    async createUser(body: UserValue): Promise<ResponseUserEntity | ResponseErrorValue> {
        try{
            const newUser=await UserModel.create(body)
            return newUser
        }catch(e){
            console.log("error ",e)
            const error=e as Error
            const responseError:ResponseErrorValue={
                message:error.message??'Ha ocurrido un error al crear un usuario',
                title:'Error en Base de Datos',
                status:false,
                code:500,
                context:{
                    error
                }   

            }
            return responseError
        }
    }
   
}