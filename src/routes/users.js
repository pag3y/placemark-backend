import {
  signup,
  login,
  getAllUsers,
  deleteUser,
  deleteAllUsers
} from '../controllers/user-controller.js';

import { requireAdmin } from '../utils/auth.js';
import Joi from 'joi';

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
  role: Joi.string().valid('admin', 'user').optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export default [
  {
    method: 'POST',
    path: '/api/users/signup',
    handler: signup,
    options: {
      auth: false,
      validate: {
        payload: signupSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/api/users/login',
    handler: login,
    options: {
      auth: false,
      validate: {
        payload: loginSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/users',
    handler: getAllUsers,
    options: { pre: [requireAdmin] }
  },
  {
    method: 'DELETE',
    path: '/api/users/{id}',
    handler: deleteUser,
    options: { pre: [requireAdmin] }
  },
  {
    method: 'DELETE',
    path: '/api/users',
    handler: deleteAllUsers,
    options: { pre: [requireAdmin] }
  }
];
