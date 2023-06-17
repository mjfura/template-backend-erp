import request from "supertest"
import app from "../../src/main"
describe("GET /api/empresas/getEmpresaBySubdominio",()=>{
    it("should return status 400 and message to subdominio that doesnt exist",async ()=>{
        const response=await request(app).get("/api/empresas/getEmpresaBySubdominio?subdominio=demo")
        expect(response.status).toEqual(400)
        expect(response.body.status).toBeFalsy()
        expect(response.body.message).toBe("No se encontró la empresa")
    })
    it("should return an error response when the subdominio param wasnt sent",async()=>{
        const response=await request(app).get("/api/empresas/getEmpresaBySubdominio")
        expect(response.status).toEqual(400)
        expect(response.body.status).toBeFalsy()
        expect(response.body.message).toBe("No se envió el subdominio")
    })
    it("should return a success response when subdominio exist",async()=>{
        const response=await request(app).get("/api/empresas/getEmpresaBySubdominio?subdominio=empresaprueba")
        expect(response.status).toEqual(200)
        expect(response.body.status).toBeTruthy()
        expect(response.body.data).toHaveProperty("nombre")
        expect(response.body.data).toHaveProperty("subdominio")
        expect(response.body.data).toHaveProperty("id")
        expect(response.body.data).toHaveProperty("correo")
        expect(response.body.data).toHaveProperty("telefono")
        expect(response.body.data).toHaveProperty("logo")
        expect(response.body.data).toHaveProperty("description")
        
    })
})