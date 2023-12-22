
const request = require('supertest');
const app = require('../app'); 

describe('Post Routes', () => {
  it('should fetch all posts', async () => {
    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); 
    expect(response.body.length > 0).toBe(true); 
  });

  it('should fetch a single post by ID', async () => {
    
    const postId = 1;
    const response = await request(app).get(`/posts/${postId}`);
    expect(response.status).toBe(200);
   
    expect(response.body.id).toBe(postId); 
    expect(response.body.title).toBeDefined();
  });

  it('should fetch comments for a post', async () => {
    const postId = 1;
    const response = await request(app).get(`/posts/${postId}/comments`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); 
  });

  it('should create a new post', async () => {
    const newPost = {
      title: 'New Post',
      body: 'This is the content of the new post.',
      userId: 1, 
    };
    const response = await request(app)
      .post('/posts')
      .send(newPost);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newPost.title);
  });

  it('should update a post', async () => {
    const postId = 1; 
    const updatedPostData = {
      title: 'Updated Post Title',
      body: 'Updated content of the post.',
    };
    const response = await request(app)
      .patch(`/posts/${postId}`)
      .send(updatedPostData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedPostData.title);
    
  });
});
