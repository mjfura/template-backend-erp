import { EmpresaEntity } from "./index.entity";
import { v4 as uuid } from "uuid";

export class EmpresaValue implements EmpresaEntity{
    public readonly id: string;
    public readonly nombre: string;
    public readonly subdominio: string;
    public readonly logo: string|null;
    public readonly description: string|null;
    public readonly correo: string|null;
    public readonly telefono: string|null;
    public readonly active: boolean;

    constructor(empresa: Omit<EmpresaEntity,"id">){
        this.id = uuid();
        this.nombre = empresa.nombre;
        this.correo = empresa.correo;
        this.telefono = empresa.telefono;
        this.active = empresa.active;
        this.subdominio = empresa.subdominio;
        this.logo = empresa.logo;
        this.description = empresa.description;
    }
}