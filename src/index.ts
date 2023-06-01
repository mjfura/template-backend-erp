import { NODE_ENV, PORT } from "./config"
import { dbInstance } from "./infraestructure/db/dependencies"
import { logger } from "./infraestructure/logger/dependencies"
import app from "./main"
dbInstance.sync().then(()=>{
    app.listen(PORT,async ()=>{
        try{
            logger.success({
                message:`SERVIDOR INICIADO EN EL PUERTO ${PORT} EN UN ENTORNO ${NODE_ENV}`,
                status:"success"
            })
        }catch(e){
            logger.error({
                message:`ERROR AL INICIAR EL SERVIDOR EN EL PUERTO ${PORT} EN UN ENTORNO ${NODE_ENV}`,
                status:"error",
                object:{
                    error:e
                }
            })
        }
    }
    )
}).catch((err)=>{
    logger.error({
        message:`ERROR AL CONECTAR CON LA BASE DE DATOS`,
        status:"error",
        object:{
            error:err
        }
    })
})