export interface ResponseEntity{
    title:string,
    message:string,
    status:boolean,
    context?:Record<string,unknown>
}
export interface ResponseSuccessEntity extends ResponseEntity{
    status:true,  
    data:Record<string,unknown>
}
export interface ResponseErrorEntity extends ResponseEntity{
    code:number,
   status:false
}