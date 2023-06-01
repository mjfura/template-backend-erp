import { DbEntity, DbRepository, DbValue } from "../../domain/db"

export class DbUseCase<DbInstanceType> {
  constructor(private readonly dbRepository: DbRepository) {}
  public connect=(param:DbEntity):DbInstanceType=>{
    const value=new DbValue(param)
    return this.dbRepository.connect(value) as DbInstanceType
  }
 
}