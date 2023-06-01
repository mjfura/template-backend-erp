import { ResponseErrorEntity, ResponseErrorValue, ResponseRepository, ResponseSuccessEntity, ResponseSuccessValue } from "../../domain/responser"

export class ResponseUseCase{
    constructor(private readonly repository:ResponseRepository){}
    public sendSuccess(param:ResponseSuccessEntity):void{
        const value=new ResponseSuccessValue(param)
        this.repository.sendSuccess(value)
    }
    public sendError(param:ResponseErrorEntity):void{
        const value=new ResponseErrorValue(param)
        this.repository.sendError({
            message:value.message,
            status:value.status,
            title:value.title,
            code:value.code,
            context:value.context
        })
    }
}