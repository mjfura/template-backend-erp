import { Router } from "express"
import { MockRepository, SequelizeRepository } from "../repository"
import { EmpresaUseCase } from "../../application"
import { ConsoleRepository } from "../../../../infraestructure/logger/repository"
import { EmpresaController } from "../controllers"
import { EmpresaMiddleware } from "../middlewares"
import { NODE_ENV } from "../../../../config"

const empresaRoutes = Router()

let empresaRepo = new SequelizeRepository()
if(NODE_ENV==="testing"){
    empresaRepo=new MockRepository()
}
const loggerRepo=new ConsoleRepository()



const empresaUseCase = new EmpresaUseCase(empresaRepo,loggerRepo)



const empresaController = new EmpresaController(empresaUseCase)
const empresaMiddleware=new EmpresaMiddleware(empresaUseCase)


empresaRoutes.post(`/createEmpresa`,empresaMiddleware.validateBodyParams([{
    message:"No se envió el nombre de la empresa",
    selector:"nombre"
},{
    message:"No se envió el subdominio de la empresa",
    selector:"subdominio"
}]), empresaController.createEmpresa)
empresaRoutes.get(`/getEmpresaBySubdominio`,empresaMiddleware.validateQueryParams([{
    message:"No se envió el subdominio",
    selector:"subdominio"
}]), empresaController.getEmpresaBySubdominio)

export default empresaRoutes