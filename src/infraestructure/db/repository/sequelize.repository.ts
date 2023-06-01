import { Sequelize } from "sequelize";
import { DbRepository, DbValue } from "../../../domain/db";

export class SequelizeRepository implements DbRepository{
    connect({database,host,password,port,username}: DbValue): Sequelize {
        const connection=new Sequelize(database,username,password,{
          host,
          port,
          dialect:"mysql"
        })
        return connection
    }
}