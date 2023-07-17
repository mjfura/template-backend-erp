export interface UserEntity{
    id:string,
    correo:string,
    password:string,
    nombre:string,
    apellido:string,
    idEmpresa?:string,
    permiso:'1'|'2',
    photo?:string
}