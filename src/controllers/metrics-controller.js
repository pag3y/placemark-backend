export const getAdminStats = async (request, h) => {
    const db = request.server.app.db;
  
    const users = await db.collection('users').get();
    const placemarks = await db.collection('placemarks').get();
  
    const totalUsers = users.size;
    const totalPlacemarks = placemarks.size;
  
    const placemarksByUser = {};
    placemarks.forEach((doc) => {
      const { userId } = doc.data();
      placemarksByUser[userId] = (placemarksByUser[userId] || 0) + 1;
    });
  
    return h.response({
      totalUsers,
      totalPlacemarks,
      placemarksByUser,
    });
  };
  