import request from "supertest"
import app from "../../src/main"
describe("POST /api/empresas/createEmpresa",()=>{
    it("should return an error response when body is void",async ()=>{
        const response=await request(app).post("/api/empresas/createEmpresa").send()
        expect(response.status).toEqual(400)
        expect(response.body.status).toBeFalsy()
        expect(response.body.message).toBe("No se envió la data para crear la empresa")     
    })
    it("should return error response when nombre and subdominio werent sent ",async ()=>{
       const response=await request(app).post("/api/empresas/createEmpresa").send({
        correo:"empresa@correo.com"
       })
       expect(response.status).toEqual(400)
       expect(response.body.status).toBeFalsy()
       expect(response.body.message).toBe("No se enviaron los campos requeridos")   
       expect(response.body.context.messages).toHaveLength(2)
        expect(response.body.context.messages).toContain("No se envió el nombre de la empresa")
        expect(response.body.context.messages).toContain("No se envió el subdominio de la empresa")
    })
    it("should return a success response when body is correct",async ()=>{
        const response=await request(app).post("/api/empresas/createEmpresa").send({
            nombre:"Empresa Prueba",
            subdominio:"empresaprueba",
            correo:"contacto@empresaprueba.com",
            telefono:"914516266",
            logo:"",
            description:"Empresa dedicada al sector industrial"
        })
        expect(response.status).toEqual(200)
        expect(response.body.status).toBeTruthy()
    })
})