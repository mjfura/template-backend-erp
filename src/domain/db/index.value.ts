import { DbEntity } from "./index.entity";

export class DbValue implements DbEntity{
    database:string;
    host:string;
    username:string;
    password:string;
    port:number;

    constructor({database,host,password,username,port}:DbEntity){
        this.database=database
        this.host=host
        this.username=username
        this.password=password
        this.port=port??3306
    }
}