import express from "express"
import morgan from "morgan"
import cors from "cors"
import {config} from "dotenv"
config()
const app=express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use("/api/users",function(_req,res){
    return res.status(200).send({
        message:"HOLA DESDE DOCKER"
    })
})

export default app