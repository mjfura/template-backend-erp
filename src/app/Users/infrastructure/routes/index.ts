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


export default userRoutes