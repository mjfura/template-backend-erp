import { LoginCredentialsEntity } from "./index.entity";

export class LoginCredentialsValue implements LoginCredentialsEntity{
    public readonly correo:string;
    public readonly password:string;
    public readonly idEmpresa: string;
    constructor({correo,idEmpresa,password}:LoginCredentialsEntity){
        this.correo=correo
        this.idEmpresa=idEmpresa
        this.password=password
    }
}