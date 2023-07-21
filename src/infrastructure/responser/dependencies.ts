import { ResponserUseCase } from "../../application/responser";
import { NodeResponserRepository } from "./repository";

const responserRepository=new NodeResponserRepository()
export const responserUseCase=new ResponserUseCase(responserRepository)