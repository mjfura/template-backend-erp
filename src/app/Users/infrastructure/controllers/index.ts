import { Request, Response } from "express"
import { ResponseErrorValue } from "../../../../domain/responser"
import { UserUseCase } from "../../application"
import { UserEntity } from "../../domain"

export class UserController {
  constructor(private userUseCase: UserUseCase) {
    this.createUser = this.createUser.bind(this)
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
}