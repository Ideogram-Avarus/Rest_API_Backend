import { FastifyInstance } from 'fastify';
import testApp from '../src/app';

let app: FastifyInstance = testApp
let accessToken: string;
let refreshToken: string;

export const getTestApp = async (): Promise<FastifyInstance> => {
    await app.ready();
    return app;
};

const closeTestApp = async () => {
    await app.close();
};



beforeAll(async () => {
  await getTestApp(); 
});

afterAll(async () => {
  await closeTestApp();
})




//login logic here
accessToken=''
refreshToken=''


export const getAccessToken = () => accessToken;
export const getRefreshToken = () => refreshToken;