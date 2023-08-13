import { Router } from "express"
import { MockRepository, SequelizeRepository } from "../repository"
import { NODE_ENV } from "../../../../config"
import { ConsoleRepository } from "../../../../infrastructure/logger/repository"
import { UserUseCase } from "../../application"
import { UserController } from "../controllers"
import { appMiddleware } from "../../../../infrastructure/middlewares"
import { BcryptRepository } from "../../../../infrastructure/encrypter/repository"

const userRoutes = Router()

let userRepo = new SequelizeRepository()
if(NODE_ENV==="testing"){
    userRepo=new MockRepository()
}
const loggerRepo=new ConsoleRepository()
const encrypterRepo=new BcryptRepository()


const userUseCase = new UserUseCase(userRepo,loggerRepo,encrypterRepo)



const userController = new UserController(userUseCase)


userRoutes.post(`/createUser`,appMiddleware.validateBodyParams([{
    message:"No se envió el correo del usuario",
    selector:"correo"
},{
    message:"No se envió la contraseña del usuario",
    selector:"password"
}]), userController.createUser)
userRoutes.get(`/getUsersByEmpresa`,appMiddleware.validateQueryParams([{
    message:"No se envió el id de la empresa",
    selector:"idEmpresa"
}]),userController.getUsersByEmpresa)
userRoutes.get(`/getUserById`,appMiddleware.validateQueryParams([{
    message:"No se envió el id del usuario",
    selector:"idUser"
}]),userController.getUserById)
userRoutes.put(`/editUser`,appMiddleware.validateBodyParams([{
    message:"No se envió el id de la empresa",
    selector:"idEmpresa"
},{
    message:"No se envió los datos del usuario",
    selector:"idUser"
}]),userController.editUser)
userRoutes.delete(`/deleteUser`,appMiddleware.validateQueryParams([{
    message:"No se envió los datos del usuario",
    selector:"idUser"
}]),userController.deleteUser)



export default userRoutes