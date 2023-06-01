import { LoggerEntity } from "./index.entity";

export interface LoggerRepository{
    info(param:LoggerEntity):void
    error(param:LoggerEntity):void
    success(param:LoggerEntity):void
}