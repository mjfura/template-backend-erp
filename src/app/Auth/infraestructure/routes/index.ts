import { Router } from "express"
import { MockRepository, SequelizeRepository } from "../../../Users/infrastructure/repository"
import { NODE_ENV } from "../../../../config"
import { BcryptRepository } from "../../../../infrastructure/encrypter/repository"
import { JwtRepository } from "../../../../infrastructure/token/repository"
import { AuthUseCase } from "../../application"
import { AuthController } from "../controllers"
import { appMiddleware } from "../../../../infrastructure/middlewares"

const authRoutes = Router()

let userRepo = new SequelizeRepository()
if(NODE_ENV==="testing"){
    userRepo=new MockRepository()
}
const encrypterRepo=new BcryptRepository()
const tokenRepo=new JwtRepository()


const authUseCase = new AuthUseCase(userRepo,tokenRepo,encrypterRepo)


const authController = new AuthController(authUseCase)


authRoutes.post(`/login`,appMiddleware.validateBodyParams([{
    message:"No se envió el correo del usuario",
    selector:"correo"
},{
    message:"No se envió la contraseña del usuario",
    selector:"password"
},{
    message:'No se envió el id de la empresa',
    selector:'idEmpresa'

}]), authController.login)


export default authRoutes