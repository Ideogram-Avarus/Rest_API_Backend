import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { CustomError } from './Common';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'; 
import { Prisma } from '@prisma/client';


export const errorHandler = (err: any, req: FastifyRequest, res: FastifyReply) => {
    console.log('[ERROR] - ', req.method , err.constructor.name , req.url);
    

    if (hasZodFastifySchemaValidationErrors(err)) {
        JSON.stringify(err, null, 2) === '{}'? console.log(err): console.log(JSON.stringify(err, null, 2));
        return res.status(422).send({
            message: 'Validation error',
            errors: err.message,
        });
    }
    if (err instanceof ZodError) {
        JSON.stringify(err, null, 2) === '{}'? console.log(err): console.log(JSON.stringify(err, null, 2));
        return res.status(422).send({
            message: 'Validation error',
            errors: err.flatten().fieldErrors,
        });
    }
    
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        JSON.stringify(err, null, 2) === '{}'? console.log(err): console.log(JSON.stringify(err, null, 2));
        if (err.code === 'P2003') {
            console.error('Foreign key violation detected!');
            console.error('Model name:', err.meta?.modelName);
            console.error('Field name:', err.meta?.field_name);
        }
    }

    if (err instanceof CustomError) {
        console.log(err.statusCode, err.message);
        return res.status(err.statusCode).send({ message: err.message });
    }

    console.log(err);
    
    return res.status(500).send({ message: err });
};