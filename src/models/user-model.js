export const UserModel = {
    async create(db, user) {
      const ref = await db.collection('users').add(user);
      const newUser = await ref.get();
      return { id: ref.id, ...newUser.data() };
    },
  
    async getByEmail(db, email) {
      const snapshot = await db.collection('users').where('email', '==', email).get();
      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    },
  
    async getAll(db) {
      const snapshot = await db.collection('users').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  
    async getById(db, id) {
      const doc = await db.collection('users').doc(id).get();
      if (!doc.exists) return null;
      return snapshot.docs.map((doc) => ({
        id: doc.id,        
      }));
      
    },
  
    async delete(db, id) {
      await db.collection('users').doc(id).delete();
      return { success: true };
    },
  
    async deleteAll(db) {
      const snapshot = await db.collection('users').get();
      const batch = db.batch();
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    }
  };