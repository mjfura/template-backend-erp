import { LoggerRepository, LoggerValue } from "../../../domain/logger";

export class ConsoleRepository implements LoggerRepository{
    info({message,status,object}: LoggerValue): void {
        if(!!object){
            console.info(status.toUpperCase()+" --> "+message+" ",object)
            return
        }
        console.info(status.toUpperCase()+" --> "+message)
    }
    error({message,status,object}: LoggerValue): void {
        if(!!object){
            console.error(status.toUpperCase()+" --> "+message+" ",object)
            return
        }
        console.error(status.toUpperCase()+" --> "+message)
    }
    success({message,status,object}: LoggerValue): void {
        if(!!object){
            console.log(status.toUpperCase()+" --> "+message+" ",object)
            return
        }
        console.log(status.toUpperCase()+" --> "+message)
    }
}