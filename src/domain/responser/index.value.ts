import { ResponseErrorEntity, ResponseSuccessEntity } from "./index.entity";

export class ResponseSuccessValue implements ResponseSuccessEntity{
    title:string;
    message:string;
    status:true;
    data:Record<string,unknown>;
    context?:Record<string,unknown>;
    constructor(param:ResponseSuccessEntity){
        this.title = param.title;
        this.message = param.message;
        this.status=param.status;
        this.data=param.data
        this.context=param.context
    }
}
export class ResponseErrorValue implements ResponseErrorEntity{
    title:string;
    message:string;
    code:number;
    status:false;
    context?:Record<string,unknown>;
    constructor(param:ResponseErrorEntity){
        this.code=param.code
        this.title = param.title;
        this.message = param.message;
        this.status = param.status;
        this.context=param.context
    }
}