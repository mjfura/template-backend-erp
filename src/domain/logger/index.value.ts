import { LoggerEntity } from "./index.entity";

export class LoggerValue implements LoggerEntity{
    message:string;
    status:"error"|"success"|"info";
    object?: Record<string, unknown>;

    constructor({message,status,object}:LoggerEntity){
        this.message=message
        this.status=status??"info"
        this.object=object
    }
}