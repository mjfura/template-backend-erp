import { Response } from "express";
import { ResponseErrorValue, ResponseSuccessValue } from "../../../domain/responser";

export class ExpressRepository implements ExpressRepository{
    sendSuccess(param:ResponseSuccessValue,res:Response):void{
        res.status(200).send(param)
    }
    sendError(param:ResponseErrorValue,res:Response):void{
        res.status(param.code).send({
            title:param.title,
            message:param.message,
            context:param.context,
            status:param.status
        })
    }
}