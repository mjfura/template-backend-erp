import { RequestHandler } from "express"
import { MiddlewareUseCase } from "../../application/middlewares"
import { ParamValidator } from "../../domain/validator"
import { ResponseErrorValue } from "../../domain/responser"

export class AppMiddleware{
    constructor(private middlewareUseCase:MiddlewareUseCase){
        this.validateQueryParams=this.validateQueryParams.bind(this)
        this.validateBodyParams=this.validateBodyParams.bind(this)
        this.checkIsAuth=this.checkIsAuth.bind(this)
        this.checkRoleIsAuth=this.checkRoleIsAuth.bind(this)
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
    public checkIsAuth():RequestHandler{
        return (req,res,next)=>{
             const auth = req.headers.authorization
             const response=this.middlewareUseCase.isAuth(auth??'')
             if(response instanceof ResponseErrorValue){
                 return res.status(response.code).send(response)
             }
             req.token=response.data.token as string
            return next()
        }
    }
    public checkRoleIsAuth():(permisos:string[])=>RequestHandler{
        return (permisos:string[])=>(req,res,next)=>{
             const token = req.token
             const response=this.middlewareUseCase.isRoleAuth(token,permisos)
             if(response instanceof ResponseErrorValue){
                 return res.status(response.code).send(response)
             }
            return next()
        }
    }
}