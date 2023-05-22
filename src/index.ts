import app from "./app"
import {config} from "dotenv"
config()
const PORT=process.env.PORT || 5000
const NODE_ENV=process.env.NODE_ENV
app.listen(PORT,async ()=>{
    try{
       console.log("ESCUCHANDO EN EL PUERTO...",PORT,NODE_ENV)
    }catch(e){
        
    }
}
)