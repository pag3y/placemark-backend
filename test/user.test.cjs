// backend/test/user.test.cjs
const request = require('supertest');
const expect = require('chai').expect;

const API_URL = 'http://localhost:4000';

describe('User API Tests', () => {
  let adminId;
  let userId;
  let adminToken;

  // 🧹 Cleanup hook before running tests
  before(async () => {
    try {
      const loginRes = await request(API_URL)
        .post('/api/users/login')
        .send({ email: 'admin@example.com', password: 'admin123' });

      const token = loginRes.body?.token;

      if (token) {
        await request(API_URL)
          .delete('/api/users')
          .set('Authorization', `Bearer ${token}`);

        console.log('🧼 All users deleted before test run.');
      } else {
        console.log('⚠️ No admin token found, skipping cleanup.');
      }
    } catch (err) {
      console.log('❌ Cleanup skipped due to error:', err.message);
    }
  });

  it('should sign up a new admin', async () => {
    const res = await request(API_URL)
      .post('/api/users/signup')
      .send({
        firstName: 'Admin',
        lastName: 'One',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });

    console.log('Admin signup response:', res.body);
    expect(res.status).to.equal(201);
    expect(res.body.user).to.have.property('id');
    expect(res.body.user.role).to.equal('admin');
    adminId = res.body.user.id;
  });

  it('should sign up a normal user', async () => {
    const res = await request(API_URL)
      .post('/api/users/signup')
      .send({
        firstName: 'User',
        lastName: 'Two',
        email: 'user@example.com',
        password: 'user123',
        role: 'user'
      });

    console.log('User signup response:', res.body);
    expect(res.status).to.equal(201);
    expect(res.body.user).to.have.property('id');
    expect(res.body.user.role).to.equal('user');
    userId = res.body.user.id;
  });

  it('should login as admin and store token', async () => {
    const loginRes = await request(API_URL)
      .post('/api/users/login')
      .send({ email: 'admin@example.com', password: 'admin123' });

    console.log('Login response:', loginRes.body);
    expect(loginRes.status).to.equal(200);
    expect(loginRes.body).to.have.property('token');
    adminToken = loginRes.body.token;
  });

  it('should list all users as admin', async () => {
    const res = await request(API_URL)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.at.least(2);
  });

  it('should delete the normal user as admin', async () => {
    const res = await request(API_URL)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.include('deleted');
  });

  it('should delete the admin user as admin', async () => {
    const res = await request(API_URL)
      .delete(`/api/users/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.include('deleted');
  });
});
