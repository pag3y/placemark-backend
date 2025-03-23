import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const requireAdmin = async (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return h.response({ error: 'Missing token' }).code(401).takeover();
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = request.server.app.db;
    const doc = await db.collection('users').doc(decoded.id).get();
    const user = doc.data();

    if (!user || user.role !== 'admin') {
      return h.response({ error: 'Admin access required' }).code(403).takeover();
    }

    return h.continue;
  } catch (err) {
    return h.response({ error: 'Invalid token' }).code(401).takeover();
  }
};
