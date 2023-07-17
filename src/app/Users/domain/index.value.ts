import { UserEntity } from "./index.entity";

export class UserValue implements UserEntity{
    public readonly id: string;
    public readonly nombre: string;
    public readonly apellido: string;
    public readonly correo: string;
    public readonly password: string;
    public readonly idEmpresa?: string | undefined;
    public readonly photo?: string | undefined;
    public readonly permiso: "1" | "2";
    constructor({apellido,correo,id,nombre,password,permiso,idEmpresa,photo}:UserEntity){
        this.id=id
        this.correo=correo
        this.nombre=nombre
        this.apellido=apellido
        this.password=password
        this.permiso=permiso
        this.idEmpresa=idEmpresa
        this.photo=photo
    }
}