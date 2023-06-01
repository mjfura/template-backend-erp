import { LoggerEntity, LoggerRepository, LoggerValue } from "../../domain/logger";

export class LoggerUseCase {
  constructor(private readonly loggerRepository: LoggerRepository) {}
  public info=(param:LoggerEntity):void=>{
    const value=new LoggerValue(param)
    return this.loggerRepository.info(value)
  }
  public success=(param:LoggerEntity):void=>{
    const value=new LoggerValue(param)
   return this.loggerRepository.success(value)
  }
  public error=(param:LoggerEntity):void=>{
    const value=new LoggerValue(param)
    return this.loggerRepository.error(value)
  }
}