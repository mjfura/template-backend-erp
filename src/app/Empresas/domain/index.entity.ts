export interface EmpresaEntity{
    id:string,
    nombre:string,
    subdominio:string,
    correo:string|null,
    telefono:string|null,
    logo:string|null,
    description:string|null,
    active:boolean
}