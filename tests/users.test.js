
const request = require('supertest');
const app = require('../app'); 

describe('User Routes', () => {
  it('should fetch all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); 
    expect(response.body.length > 0).toBe(true); 
  });

  it('should authenticate a user and return a token', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testUser',
        password: 'testPassword',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined(); 
  });

  it('should fetch user posts', async () => {
    const userId = 1;
    const response = await request(app).get(`/users/${userId}/posts`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); 
  });


  it('should create a new user', async () => {
    const newUser = {
      username: 'newUser',
      password: 'newPassword',
    };
    const response = await request(app)
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.username).toBe(newUser.username);
    
  });

  it('should update user information', async () => {
    const userId = 1;
    const updatedUserData = {
      username: 'updatedUser',
      password: 'updatedPassword',
    };
    const response = await request(app)
      .patch(`/users/${userId}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(updatedUserData.username);
  });
});
