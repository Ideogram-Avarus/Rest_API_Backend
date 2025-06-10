import autoload from '@fastify/autoload';
import path from 'path';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';


export const registerRoutesPlugin = fp(async function(app: FastifyInstance) {
    app.register(autoload, {
        dir: path.join(__dirname, '..', 'routes'),
        ignorePattern: /(^|[\/\\])_/,
    });
})


export const registerRoutes2: FastifyPluginAsync = async (app: FastifyInstance) => {
    app.register(autoload, {
        dir: path.join(__dirname, '..', 'routes'),
        ignorePattern: /(^|[\/\\])_/,
    });
};


export default function registerRoutes(app: FastifyInstance) {
  app.register(autoload, {
    dir: path.join(__dirname, '..', 'routes'),
    ignorePattern: /(^|[\/\\])_/,
  });
}