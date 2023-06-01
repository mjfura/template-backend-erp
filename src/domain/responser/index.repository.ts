import { ResponseErrorEntity, ResponseSuccessEntity } from "./index.entity";

export interface ResponseRepository{
    sendSuccess(param:ResponseSuccessEntity):void
    sendError(param:ResponseErrorEntity):void
}