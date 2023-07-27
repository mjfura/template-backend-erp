import { Request, Response } from "express"
import { AuthUseCase } from "../../application"
import { LoginCredentialsEntity } from "../../domain"
import { ResponseErrorValue } from "../../../../domain/responser"

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {
    this.login = this.login.bind(this)
  }

  public async login(req: Request, res: Response) {
    try{
        const data=req.body as LoginCredentialsEntity
        const response=await this.authUseCase.login({
         ...data
        })
        if(response instanceof ResponseErrorValue){
          return res.status(response.code).send(response)
        }
        return res.status(200).send(response)
    }catch(e){
      const error=new ResponseErrorValue({
        status:false,
        title:"Error en el controller login",
        message:"Ha ocurrido un error en el controller login",
        context:{
          error:e,
        },
        code:500
      })
      return res.status(error.code).send(error)
    }
  }
}