import { DbEntity } from "./index.entity";

export interface DbRepository{
    connect(param:DbEntity):void
}