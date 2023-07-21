import { MiddlewareUseCase } from "../../application/middlewares";
import { NodeResponserRepository } from "../responser/repository";
import { AppMiddleware } from "./index.middleware";
const responserRepository=new NodeResponserRepository()
const middlewareUseCase=new MiddlewareUseCase(responserRepository)
export const appMiddleware=new AppMiddleware(middlewareUseCase)