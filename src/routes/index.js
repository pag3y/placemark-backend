import userRoutes from './users.js';
import socialRoutes from './social.js';
import metricsRoutes from './metrics.js';
import placemarkRoutes from './placemarks.js';
import swaggerRoutes from './swagger.js';

export default [
  ...userRoutes,
  ...socialRoutes,
  ...metricsRoutes,
  ...placemarkRoutes,
  ...swaggerRoutes
];
