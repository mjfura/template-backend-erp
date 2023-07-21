import { ResponseErrorEntity, ResponseErrorValue, ResponseSuccessEntity, ResponseSuccessValue, ResponserRepository } from "../../domain/responser"

export class ResponserUseCase{
    constructor(private readonly repository:ResponserRepository){}
    public sendSuccess(param:ResponseSuccessEntity):ResponseSuccessValue{
        return this.repository.sendSuccess(param)
    }
    public sendError(param:ResponseErrorEntity):ResponseErrorValue{
        return this.repository.sendError({...param
        })
    }
}