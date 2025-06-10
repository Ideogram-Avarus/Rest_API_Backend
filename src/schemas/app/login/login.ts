import {CustomError} from '@/infra/errors/Common';
import {prisma} from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { z, ZodObject } from "zod";
import SchemaBuilder from "../baseSchema";
import {AccessToken, RefreshToken} from "@/schemas/security/Tokens"; 
import * as Errors from './loginErrors'


class Login extends SchemaBuilder {
    static postSchemaBody = z.object({
        email: z.string(),
        password: z.string().min(6),
      });
    
    static postSchemaResponse = {
        200: z.object({
            token: z.string(),
            refresh_token: z.string()
        }),
    }

    static async check_if_email_is_repeated(email: string): Promise<void> {
        const existing_user = await prisma.users.findUnique({
            where: {
                email
            }
        })
        if (existing_user) {
            throw new CustomError(400, 'Username already exists')
        }
    }

    static async get_user_id_with_email(email: string): Promise<number> {
        const user_id = await prisma.users.findUnique({
            where: {
                email
            }
        })
        if (!user_id) {
            throw Errors.UserNotFound;
        }
        return user_id.id
    }

    static async LoginLogic(email:string, password:string): Promise<object> {
        const existing_user = await prisma.users.findUnique({
            where: {
                email,
            }
        })
        if (!existing_user) {
            throw Errors.UserNotFound
        }

        if (!existing_user.confirmed) {
            throw Errors.UserNotConfirmed
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existing_user.password
        );
        if (!isPasswordCorrect) {
            throw Errors.InvalidPassword
        }

        const user_id = await this.get_user_id_with_email(email)
        const token = AccessToken.fromUserId(user_id).token
        const refresh_token = RefreshToken.fromUserId(user_id).token

        
        return { token: token, refresh_token: refresh_token };

    }
}

export default Login




