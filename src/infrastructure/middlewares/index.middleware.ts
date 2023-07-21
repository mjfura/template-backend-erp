import { RequestHandler } from "express"
import { MiddlewareUseCase } from "../../application/middlewares"
import { ParamValidator } from "../../domain/validator"
import { ResponseErrorValue } from "../../domain/responser"

export class AppMiddleware{
    constructor(private middlewareUseCase:MiddlewareUseCase){
        this.validateQueryParams=this.validateQueryParams.bind(this)
        this.validateBodyParams=this.validateBodyParams.bind(this)
    }
    
    public validateQueryParams(requiredParams:Array<ParamValidator>):RequestHandler{
        return (req,res,next)=>{
            const params=req.query
            const response=this.middlewareUseCase.validateQueryParams(params,requiredParams)
            if(response instanceof ResponseErrorValue){
                return res.status(response.code).send(response)
            }
            return next()
        }
    }
    public validateBodyParams(requiredParams:Array<ParamValidator>):RequestHandler{
        return (req,res,next)=>{
            const params=req.body
            const response=this.middlewareUseCase.validateBodyParams(requiredParams,params)
            if(response instanceof ResponseErrorValue){
                return res.status(response.code).send(response)
            }
            return next()
        }
    }
}