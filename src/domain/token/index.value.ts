import { PayloadUserTokenEntity } from "./index.entity";

export class PayloadUserTokenValue implements PayloadUserTokenEntity{
    public readonly id: string;
    public readonly correo: string;
    public readonly idEmpresa: string|null;
    public readonly permiso: string;
    constructor({correo,id,idEmpresa,permiso}:PayloadUserTokenEntity){
        this.id=id
        this.correo=correo
        this.idEmpresa=idEmpresa
        this.permiso=permiso
    }

}