
import { AccessToken } from "@/schemas/security/Tokens";
import { FastifyReply, FastifyRequest } from "fastify"; 
import { InvalidToken } from "../errors/Validation";

export const validateTokenOnRequest = async (req: FastifyRequest, res: FastifyReply) => {
        if (!req.headers.authorization) {
            return
        }
        
        let auth_token: string  
        try {
            auth_token = req.headers.authorization?.replace('Bearer ', '')
        } catch (error) {
            throw InvalidToken
        }

        req.Token = AccessToken.fromToken(auth_token)
        return;
}



