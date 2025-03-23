import Hapi from '@hapi/hapi';
import routes from './routes/index.js';
import admin from 'firebase-admin';
import Inert from '@hapi/inert';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import HapiAuthJwt2 from 'hapi-auth-jwt2'; // ✅ Add this

dotenv.config();

const serviceAccount = JSON.parse(
  readFileSync(new URL('../firebase-service-account.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('❌ JWT_SECRET is missing in .env file');
}



const server = Hapi.server({
  port: 4000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['http://localhost:5173'], 
      credentials: true,
    },
  },
});

server.app.db = db;
server.app.jwtSecret = JWT_SECRET;

const validate = async (decoded, request, h) => {
  if (decoded?.id) {
    return { isValid: true, credentials: decoded };
  }
  return { isValid: false };
};

const init = async () => {
  await server.register([Inert, HapiAuthJwt2]); 

  server.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    validate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
