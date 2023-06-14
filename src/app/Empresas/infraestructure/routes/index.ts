import { Router } from "express"
import { SequelizeRepository } from "../repository"
import { EmpresaUseCase } from "../../application"
import { ConsoleRepository } from "../../../../infraestructure/logger/repository"
import { EmpresaController } from "../controllers"

const empresaRoutes = Router()

const empresaRepo = new SequelizeRepository()
const loggerRepo=new ConsoleRepository()



const empresaUseCase = new EmpresaUseCase(empresaRepo,loggerRepo)



const empresaController = new EmpresaController(empresaUseCase)


empresaRoutes.post(`/createEmpresa`, empresaController.createEmpresa)
empresaRoutes.get(`/getEmpresaBySubdominio`, empresaController.getEmpresaBySubdominio)

export default empresaRoutes