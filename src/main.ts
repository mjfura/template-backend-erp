import express from "express"
import morgan from "morgan"
import cors from "cors"
import {config} from "dotenv"
import userRoutes from "./app/Users/infrastructure/routes"
import empresaRoutes from "./app/Empresas/infrastructure/routes"
config()
const app=express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use("/api/empresas",empresaRoutes)
app.use('api/users',userRoutes)

export default app