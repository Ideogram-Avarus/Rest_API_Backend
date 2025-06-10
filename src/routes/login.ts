import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import login from "../schemas/app/login/login";
import {AccessToken, RefreshToken} from "@/schemas/security/Tokens"; 
import { z } from "zod";


export default async function route_login(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/login", {
        schema: {
            body: login.PostSchemaBody,
            response: login.PostSchemaResponse,
            tags: ['Login and Tokens'],
        },
    }, async (req: FastifyRequest<{ Body: z.infer<typeof login.postSchemaBody> }>, res: FastifyReply) => {
        const response = await login.LoginLogic(req.body.email, req.body.password)
        res.status(200).send(response);
    });
}