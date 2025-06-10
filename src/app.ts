import fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { errorHandler } from './infra/errors/ErrorHandler';
import { registerRoutes2 } from './lib/route_register';
import { validateTokenOnRequest } from '@/infra/security/tokenAuth';

dotenv.config();

const app = fastify();


app.register(cors, {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
});

app.register(fastifySwagger, {
    swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
        title: "Auth Intranet-CSC",
        description:
        "Controle de Login do Intranet CSC",
        version: "1.0.0",
    },securityDefinitions: {
        Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        },
    }
    },
    transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);



app.addHook("onRequest", validateTokenOnRequest)
app.setErrorHandler(errorHandler);
app.register(registerRoutes2);


export default app;