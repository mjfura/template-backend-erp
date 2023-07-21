import { RequestHandler } from "express";
import { EmpresaUseCase } from "../../application";
import { ResponseErrorValue } from "../../../../domain/responser";
import { ParamValidator } from "../../../../domain/validator";

export class EmpresaMiddleware{
    constructor(private empresaUseCase:EmpresaUseCase){
        this.validateQueryParams=this.validateQueryParams.bind(this)
    }
    
    public validateQueryParams(requiredParams:Array<ParamValidator>):RequestHandler{
        return (req,res,next)=>{
            const params=req.query
            const response=this.empresaUseCase.validateQueryParams(params,requiredParams)
            if(response instanceof ResponseErrorValue){
                return res.status(response.code).send(response)
            }
            return next()
        }
    }
    public validateBodyParams(requiredParams:Array<ParamValidator>):RequestHandler{
        return (req,res,next)=>{
            const params=req.body
            const response=this.empresaUseCase.validateBodyParams(requiredParams,params)
            if(response instanceof ResponseErrorValue){
                return res.status(response.code).send(response)
            }
            return next()
        }
    }
}