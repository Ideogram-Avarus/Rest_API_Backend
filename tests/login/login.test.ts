import request from "supertest";
import dotenv from "dotenv";
import { getTestApp } from '../jest.setup'
import { FastifyInstance } from "fastify";

dotenv.config();

describe("Auth Routes", () => {
    let app: FastifyInstance;
    
    beforeAll(async () => {
        app = await getTestApp();
    });

    it("should login successfully", async () => {
        const response = await request(app.server)
            .post("/login")
            .send({ email: "tester@tester.com", password: "testpass" });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });
    it("should impede invalid password", async () => {
        const response = await request(app.server)
            .post("/login")
            .send({ email: "tester@tester.com", password: "asdfasdfasdfa" });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });
    it("should impede invalid user", async () => {
        const response = await request(app.server)
            .post("/login")
            .send({ email: 'asdfasdfasdfasdf', password: "asdfasdfasdfa" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    });
});