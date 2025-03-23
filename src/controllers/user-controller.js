import { UserModel } from '../models/user-model.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const signup = async (request, h) => {
  const db = request.server.app.db;
  const user = request.payload;

  const existing = await UserModel.getByEmail(db, user.email);
  if (existing) {
    return h.response({ error: 'User already exists' }).code(400);
  }

  const createdUser = await UserModel.create(db, user);
  return h.response({ user: createdUser }).code(201);
};

export const login = async (request, h) => {
  const db = request.server.app.db;
  const { email, password } = request.payload;

  const user = await UserModel.getByEmail(db, email);
  if (!user || user.password !== password) {
    return h.response({ error: 'Invalid credentials' }).code(401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName   
    },
    JWT_SECRET,
    { expiresIn: '2h' } 
  );
  
  

  return h.response({
    message: 'Login successful',
    token,              
    user
  }).code(200);
};

export const getAllUsers = async (request, h) => {
  const db = request.server.app.db;
  const users = await UserModel.getAll(db);
  return h.response(users).code(200);
};

export const deleteUser = async (request, h) => {
  const db = request.server.app.db;
  const { id } = request.params;

  await UserModel.delete(db, id);
  return h.response({ message: 'User deleted' }).code(200);
};

export const deleteAllUsers = async (request, h) => {
  const db = request.server.app.db;

  await UserModel.deleteAll(db);
  return h.response({ message: 'All users deleted' }).code(200);
};
