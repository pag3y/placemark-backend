import { 
    getPublicPlacemarks,
    likePlacemark,
    unlikePlacemark,
    getComments,
    addComment,
    deleteComment
  } from '../controllers/social-controller.js';
  
  export default [
    {
      method: 'GET',
      path: '/api/placemarks/public',
      handler: getPublicPlacemarks
    },

    {
      method: 'POST',
      path: '/api/placemarks/{id}/like',
      handler: likePlacemark,
      options: { auth: 'jwt' }
    },

    {
      method: 'DELETE',
      path: '/api/placemarks/{id}/unlike',
      handler: unlikePlacemark,
      options: { auth: 'jwt' }
    },
  
    {
      method: 'GET',
      path: '/api/placemarks/{id}/comments',
      handler: getComments
    },
  
    {
      method: 'POST',
      path: '/api/placemarks/{id}/comments',
      handler: addComment,
      options: { auth: 'jwt' }
    },
  
    {
      method: 'DELETE',
      path: '/api/placemarks/{id}/comments/{commentId}',
      handler: deleteComment,
      options: { auth: 'jwt' } 
    }
  ];
  