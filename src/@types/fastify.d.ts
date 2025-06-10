
import AccessToken from "@/domain/AccessToken";
import { Services } from "@/domain/services";
import "fastify";

declare module "fastify" {
    interface FastifyRequest {
        Token: AccessToken
    }
}