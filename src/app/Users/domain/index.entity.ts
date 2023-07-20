export interface UserEntity{
    id:string,
    correo:string,
    password:string,
    nombre:string,
    apellido:string,
    empresa_id?:string|null,
    permiso:'1'|'2',
    photo?:string|null,
    lastLogin?:Date|null,
    active?:boolean
}
export interface ResponseUserEntity extends UserEntity{
    creado:Date,
    modificado:Date
}