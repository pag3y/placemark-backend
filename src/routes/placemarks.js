import { PlacemarkController } from '../controllers/placemark-controller.js';

export default [
  {
    method: 'POST',
    path: '/api/placemarks',
    handler: PlacemarkController.create,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'GET',
    path: '/api/placemarks',
    handler: PlacemarkController.getAll,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'GET',
    path: '/api/placemarks/{id}',
    handler: PlacemarkController.getById,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'PUT',
    path: '/api/placemarks/{id}',
    handler: PlacemarkController.update,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/api/placemarks/{id}',
    handler: PlacemarkController.delete,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/api/placemarks',
    handler: PlacemarkController.deleteAll,
    options: {
      auth: 'jwt'
    }
  }
];
