const request = require('supertest');
const expect = require('chai').expect;

const API_URL = 'http://localhost:4000';

describe('Placemark API Tests', () => {
  let placemarkId;

  before(async () => {
    const cleanupRes = await request(API_URL).delete('/api/placemarks');
    console.log('🧼 Cleanup response:', cleanupRes.body);
  });

  it('should create a placemark', async () => {
    const placemark = {
      name: 'Clonmacnoise',
      description: 'Ancient monastery in Offaly',
      category: 'Historical Site',
      lat: 53.3267,
      lng: -7.9891,
      imageUrl: 'https://example.com/clonmacnoise.jpg'
    };

    const res = await request(API_URL)
      .post('/api/placemarks')
      .send(placemark);

    expect(res.status).to.equal(201);
    expect(res.body).to.include(placemark);
    placemarkId = res.body.id;
  });

  it('should fetch all placemarks', async () => {
    const res = await request(API_URL).get('/api/placemarks');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.some(p => p.id === placemarkId)).to.be.true;
  });

  it('should fetch a single placemark', async () => {
    const res = await request(API_URL).get(`/api/placemarks/${placemarkId}`);
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(placemarkId);
  });

  it('should update a placemark', async () => {
    const updated = {
      name: 'Updated Clonmacnoise',
      description: 'Updated description',
      category: 'Monastery',
      lat: 53.32,
      lng: -7.98,
      imageUrl: 'https://example.com/updated.jpg'
    };

    const res = await request(API_URL)
      .put(`/api/placemarks/${placemarkId}`)
      .send(updated);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Placemark updated');
  });

  it('should delete the placemark', async () => {
    const res = await request(API_URL)
      .delete(`/api/placemarks/${placemarkId}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.include('deleted');
  });
});
