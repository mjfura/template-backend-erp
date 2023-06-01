export interface LoggerEntity{
    message:string,
    status?:"error"|"success"|"info",
    object?:Record<string,unknown>
}