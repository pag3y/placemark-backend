import { PlacemarkModel } from '../models/placemark-model.js';

export const getPublicPlacemarks = async (request, h) => {
    const db = request.server.app.db;
  
    try {
      const placemarks = await PlacemarkModel.getPublic(db);
      return h.response(placemarks || []).code(200);
    } catch (err) {
      console.error('Error fetching public placemarks:', err);
      return h.response({ error: 'Failed to load public placemarks' }).code(500);
    }
  };
  

export const likePlacemark = async (request, h) => {
  const db = request.server.app.db;
  const userId = request.auth.credentials.id;
  const placemarkId = request.params.id;

  const updated = await PlacemarkModel.addLike(db, placemarkId, userId);
  return updated
    ? h.response({ message: 'Liked!' }).code(200)
    : h.response({ error: 'Unable to like placemark' }).code(400);
};

export const unlikePlacemark = async (request, h) => {
  const db = request.server.app.db;
  const userId = request.auth.credentials.id;
  const placemarkId = request.params.id;

  const updated = await PlacemarkModel.removeLike(db, placemarkId, userId);
  return updated
    ? h.response({ message: 'Unliked!' }).code(200)
    : h.response({ error: 'Unable to unlike placemark' }).code(400);
};

export const getComments = async (request, h) => {
  const db = request.server.app.db;
  const placemarkId = request.params.id;

  const comments = await PlacemarkModel.getComments(db, placemarkId);
  return h.response(comments || []).code(200);
};

export const addComment = async (request, h) => {
    const db = request.server.app.db;
    const userId = request.auth.credentials.id;
    const placemarkId = request.params.id;
    const { content } = request.payload;
  
    if (!content) {
      return h.response({ error: 'Comment cannot be empty' }).code(400);
    }
  
    // 🔍 Fetch user to get their name
    const userDoc = await db.collection('users').doc(userId).get();
    const user = userDoc.exists ? userDoc.data() : null;
  
    const comment = {
      id: crypto.randomUUID(),
      userId,
      userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown User',
      content,
      timestamp: new Date().toISOString(),
    };
  
    const updated = await PlacemarkModel.addComment(db, placemarkId, comment);
    return updated
      ? h.response({ message: 'Comment added!' }).code(201)
      : h.response({ error: 'Failed to add comment' }).code(400);
  };
  

export const deleteComment = async (request, h) => {
  const db = request.server.app.db;
  const userId = request.auth.credentials.id;
  const { id: placemarkId, commentId } = request.params;

  const result = await PlacemarkModel.deleteComment(db, placemarkId, commentId, userId);
  return result
    ? h.response({ message: 'Comment deleted' }).code(200)
    : h.response({ error: 'Failed to delete comment' }).code(400);
};
