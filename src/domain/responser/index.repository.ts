import { ResponseErrorEntity, ResponseSuccessEntity } from "./index.entity";
import { ResponseErrorValue, ResponseSuccessValue } from "./index.value";

export interface ResponserRepository{
    sendSuccess(param:ResponseSuccessEntity):ResponseSuccessValue
    sendError(param:ResponseErrorEntity):ResponseErrorValue
}