import { getAdminStats } from '../controllers/metrics-controller.js';
import { requireAdmin } from '../utils/auth.js';

export default [
  {
    method: 'GET',
    path: '/api/admin/stats',
    handler: getAdminStats,
    options: {
      pre: [requireAdmin],
    },
  },
];
