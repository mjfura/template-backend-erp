import { ResponseErrorEntity, ResponseErrorValue, ResponserRepository, ResponseSuccessEntity, ResponseSuccessValue } from "../../../domain/responser";

export class NodeResponserRepository implements ResponserRepository{
    sendSuccess(param:ResponseSuccessEntity):ResponseSuccessValue{
        const {data,message,status,title,context}=param
        const response=new ResponseSuccessValue(
            {
                data,
                message,
                status,
                title,
                context
            }
        )
        return response
    }
    sendError(param:ResponseErrorEntity):ResponseErrorValue{
        const response=new ResponseErrorValue(
            {...param}
        )
        return response
    
    }
}