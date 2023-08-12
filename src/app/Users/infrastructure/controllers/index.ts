import { Request, Response } from "express"
import { ResponseErrorValue } from "../../../../domain/responser"
import { UserUseCase } from "../../application"
import { UserEntity } from "../../domain"

export class UserController {
  constructor(private userUseCase: UserUseCase) {
    this.createUser = this.createUser.bind(this)
    this.getUsersByEmpresa = this.getUsersByEmpresa.bind(this)
  }

  public async createUser(req: Request, res: Response) {
    try{
        const data=req.body as Omit<UserEntity,"id">
        const response=await this.userUseCase.createUser({
         ...data
        })
        if(response instanceof ResponseErrorValue){
          return res.status(response.code).send(response)
        }
        return res.status(200).send(response)
    }catch(e){
      const error=new ResponseErrorValue({
        status:false,
        title:"Error en el controller",
        message:"Ha ocurrido un error en el controller",
        context:{
          error:e,
        },
        code:500
      })
      return res.status(error.code).send(error)
    }
  }
  public async getUsersByEmpresa(req: Request, res: Response) {
    try{
      const {idEmpresa}=req.query as {idEmpresa:string}
        const response=await this.userUseCase.getUsersByEmpresa(idEmpresa)
       
        if(response instanceof ResponseErrorValue){
          return res.status(response.code).send(response)
        }
        return res.status(200).send(response)
    }catch(e){
      const error=new ResponseErrorValue({
        status:false,
        title:"Error en el controller",
        message:"Ha ocurrido un error en el controller",
        context:{
          error:e,
        },
        code:500
      })
      return res.status(error.code).send(error)
    }
  }
  public async editUser(req: Request, res: Response) {
    try{
       const {id:idUser,...body}=req.body as UserEntity
        const response=await this.userUseCase.editUser(idUser,body)
        if(response instanceof ResponseErrorValue){
          return res.status(response.code).send(response)
        }
        return res.status(200).send(response)
    }catch(e){
      const error=new ResponseErrorValue({
        status:false,
        title:"Error en el controller",
        message:"Ha ocurrido un error en el controller",
        context:{
          error:e,
        },
        code:500
      })
      return res.status(error.code).send(error)
    
    }
  }
  public async deleteUser(req: Request, res: Response) {
    try{
      const {idUser}=req.query as {idUser:string}
        const response=await this.userUseCase.editUser(idUser,{
          active:false
        })
        if(response instanceof ResponseErrorValue){
          return res.status(response.code).send(response)
        }
        return res.status(200).send(response)
    }catch(e){
      const error=new ResponseErrorValue({
        status:false,
        title:"Error en el controller",
        message:"Ha ocurrido un error en el controller",
        context:{
          error:e,
        },
        code:500
      })
      return res.status(error.code).send(error)
    
    }
  }
  
}