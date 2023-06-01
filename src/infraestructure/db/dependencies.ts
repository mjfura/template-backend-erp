import { Sequelize } from "sequelize";
import { DbUseCase } from "../../application/db/index.useCase";
import { DB_NAME, DB_PASSWORD, DB_USER } from "../../config";
import { SequelizeRepository } from "./repository/sequelize.repository";

const dbRepository=new SequelizeRepository()
const dbUseCase= new DbUseCase<Sequelize>(dbRepository)
export const dbInstance=dbUseCase.connect({
    database:DB_NAME,
    host:"db_dev",
    password:DB_PASSWORD,
    username:DB_USER
})