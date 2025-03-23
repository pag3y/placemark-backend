import { PlacemarkModel } from '../models/placemark-model.js';

export const PlacemarkController = {
  async create(request, h) {
    const db = request.server.app.db;
    const userId = request.auth.credentials.id;
    const placemark = { ...request.payload, userId };
  
    const created = await PlacemarkModel.create(db, placemark);
    return h.response(created).code(201);
  },

  async getAll(request, h) {
    const db = request.server.app.db;
    const user = request.auth?.credentials;
  
    if (!user) {
      return h.response({ error: 'Unauthorized' }).code(401);
    }
  
    const placemarks = await PlacemarkModel.getByUserId(db, user.id);
    return h.response(placemarks).code(200);
  }
  ,

  async getById(request, h) {
    const db = request.server.app.db;
    const { id } = request.params;
    const placemark = await PlacemarkModel.getById(db, id);
    if (!placemark) {
      return h.response({ error: 'Placemark not found' }).code(404);
    }
    return h.response(placemark).code(200);
  },

  async update(request, h) {
    const db = request.server.app.db;
    const { id } = request.params;
    const updates = request.payload;

    const existing = await PlacemarkModel.getById(db, id);
    if (!existing) {
      return h.response({ error: 'Placemark not found' }).code(404);
    }

    await PlacemarkModel.update(db, id, updates);
    return h.response({ message: 'Placemark updated' }).code(200);
  },

  async delete(request, h) {
    const db = request.server.app.db;
    const { id } = request.params;

    await PlacemarkModel.delete(db, id);
    return h.response({ message: 'Placemark deleted' }).code(200);
  },

  async deleteAll(request, h) {
    const db = request.server.app.db;
    await PlacemarkModel.deleteAll(db);
    return h.response({ message: 'All placemarks deleted' }).code(200);
  },
};
