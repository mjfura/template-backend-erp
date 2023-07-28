import request from "supertest"
import app from "../../src/main"
describe("POST /api/auth/login",()=>{
    it("should return an error response when body is void",async ()=>{
        const response=await request(app).post("/api/auth/login").send()
        expect(response.status).toEqual(400)
        expect(response.body.status).toBeFalsy()
        expect(response.body.message).toBe("No se envió la data para realizar el login")     
    })
    it("should return error response when correo password werent sent ",async ()=>{
       const response=await request(app).post("/api/auth/login").send({
        idEmpresa:1
       })
       expect(response.status).toEqual(400)
       expect(response.body.status).toBeFalsy()
       expect(response.body.message).toBe("No se enviaron los campos requeridos")
         expect(response.body.context.messages).toHaveLength(2)
        expect(response.body.context.messages).toContain("No se envió el correo del usuario")
        expect(response.body.context.messages).toContain("No se envió la contraseña del usuario")
    })
   
    it("should return a success response when body is correct",async ()=>{
        const response=await request(app).post("/api/auth/login").send({
            correo:'mfura@gmail.com',
            password:'12345678',
            idEmpresa:1
        })
        expect(response.status).toEqual(200)
        expect(response.body.status).toBeTruthy()
    })
})