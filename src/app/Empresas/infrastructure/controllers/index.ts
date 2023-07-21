import { Request, Response } from "express";
import { EmpresaUseCase } from "../../application";
import { EmpresaEntity } from "../../domain";
import { ResponseErrorValue } from "../../../../domain/responser";

export class EmpresaController {
  constructor(private empresaUseCase: EmpresaUseCase) {
    this.createEmpresa = this.createEmpresa.bind(this)
    this.getEmpresaBySubdominio = this.getEmpresaBySubdominio.bind(this)
  }

  public async getEmpresaBySubdominio(req: Request, res: Response) {
    try{
        const {subdominio}=req.query as {subdominio:string}
        const response=await this.empresaUseCase.getEmpresaBySubdominio(subdominio)
        if(response instanceof ResponseErrorValue){
          return res.status(response.code).send(response)
        }
        return res.status(200).send(response)
    }catch(e){
      console.log("error controller ",e)
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

  public async createEmpresa(req: Request, res: Response) {
    try{
        const data=req.body as Omit<EmpresaEntity,"id"|"active">
        const response=await this.empresaUseCase.createEmpresa({
          correo:data.correo,
          nombre:data.nombre,
          subdominio:data.subdominio,
          telefono:data.telefono,
          description:data.description,
          logo:data.logo
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