import express from "express"
import morgan from "morgan"
import cors from "cors"
import {config} from "dotenv"
import empresaRoutes from "./app/Empresas/infraestructure/routes"
config()
const app=express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use("/api/empresas",empresaRoutes)

export default app