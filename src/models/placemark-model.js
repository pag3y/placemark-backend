export const PlacemarkModel = {
  async create(db, placemark) {
    const ref = await db.collection('placemarks').add({
      ...placemark,
      likes: [],
      comments: [],
      visibility: placemark.visibility || 'private',
    });
    const doc = await ref.get();
    return { id: ref.id, ...doc.data() };
  },

  async getByUserId(db, userId) {
    const snapshot = await db.collection('placemarks').where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getById(db, id) {
    const doc = await db.collection('placemarks').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async getAll(db) {
    const snapshot = await db.collection('placemarks').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async update(db, id, updates) {
    const ref = db.collection('placemarks').doc(id);
    await ref.update({...updates});
    const updatedDoc = await ref.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  },

  async delete(db, id) {
    await db.collection('placemarks').doc(id).delete();
    return { success: true };
  },

  async deleteAll(db) {
    const snapshot = await db.collection('placemarks').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  },

  async getPublic(db) {
    const snapshot = await db.collection('placemarks')
      .where('visibility', '==', 'public')
      .get();
  
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  

  async addLike(db, placemarkId, userId) {
    const ref = db.collection('placemarks').doc(placemarkId);
    const doc = await ref.get();
    if (!doc.exists) return null;
    const data = doc.data();
    const likes = new Set(data.likes || []);
    likes.add(userId);
    await ref.update({ likes: Array.from(likes) });
    return true;
  },

  async removeLike(db, placemarkId, userId) {
    const ref = db.collection('placemarks').doc(placemarkId);
    const doc = await ref.get();
    if (!doc.exists) return null;
    const data = doc.data();
    const likes = new Set(data.likes || []);
    likes.delete(userId);
    await ref.update({ likes: Array.from(likes) });
    return true;
  },

  async getComments(db, placemarkId) {
    const doc = await db.collection('placemarks').doc(placemarkId).get();
    if (!doc.exists) return [];
    return doc.data().comments || [];
  },

  async addComment(db, placemarkId, comment) {
    const ref = db.collection('placemarks').doc(placemarkId);
    const doc = await ref.get();
    if (!doc.exists) return null;
    const data = doc.data();
    const comments = data.comments || [];
    comments.push(comment);
    await ref.update({ comments });
    return true;
  },

  async deleteComment(db, placemarkId, commentId, userId) {
    const ref = db.collection('placemarks').doc(placemarkId);
    const doc = await ref.get();
    if (!doc.exists) return null;
    const data = doc.data();
    const comments = (data.comments || []).filter(c => c.id !== commentId || c.userId !== userId);
    await ref.update({ comments });
    return true;
  }
};
