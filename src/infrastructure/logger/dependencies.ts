import { LoggerUseCase } from "../../application/logger"
import { ConsoleRepository } from "./repository"

const loggerRepository=new ConsoleRepository()
export const logger=new LoggerUseCase(loggerRepository)