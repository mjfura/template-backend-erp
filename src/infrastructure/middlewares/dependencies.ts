import { MiddlewareUseCase } from "../../application/middlewares";
import { NodeResponserRepository } from "../responser/repository";
import { JwtRepository } from "../token/repository";
import { AppMiddleware } from "./index.middleware";
const responserRepository=new NodeResponserRepository()
const tokenRepository=new JwtRepository()
const middlewareUseCase=new MiddlewareUseCase(responserRepository,tokenRepository)
export const appMiddleware=new AppMiddleware(middlewareUseCase)