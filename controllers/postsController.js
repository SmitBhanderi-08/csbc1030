const { users, posts, comments } = require('../data/posts.json');  
const db = require('../db');  

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const userId = req.user.id;  
      const [rows, fields] = await db.execute('SELECT * FROM posts WHERE userId = ?', [userId]);

      res.json(rows);  
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


module.exports = {
  getPostById: async (req, res) => {
    try {
      const postId = req.params.postId;
      const [rows, fields] = await db.execute('SELECT * FROM posts WHERE id = ?', [postId]);

      if (rows.length === 0) {
        res.status(404).json({ message: 'Post not found' });
      } else {
        const post = rows[0];
        res.json(post); 
      }
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
};


module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const userId = req.user.id;   
      const [rows, fields] = await db.execute('SELECT * FROM posts WHERE userId = ?', [userId]);

      res.json(rows);   
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const postId = req.params.postId; 
      const [rows, fields] = await db.execute('SELECT * FROM posts WHERE id = ?', [postId]);

      if (rows.length === 0) {
        res.status(404).json({ message: 'Post not found' });
      } else {
        const post = rows[0];
        res.json(post);
      }
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getPostComments: async (req, res) => {
    try {
      const postId = req.params.postId; 
      const [rows, fields] = await db.execute('SELECT * FROM comments WHERE postId = ?', [postId]);

      res.json(rows);
    } catch (error) {
      console.error('Error fetching comments for post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createPost: async (req, res) => {
    try {
      const newPost = req.body; 
      const [result] = await db.execute('INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)', [
        req.user.id,  
        newPost.title,
        newPost.body,
      ]);

      newPost.id = result.insertId;

      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addCommentToPost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const newComment = req.body;
      const [result] = await db.execute('INSERT INTO comments (postId, name, email, body) VALUES (?, ?, ?, ?)', [
        postId,
        newComment.name,
        newComment.email,
        newComment.body,
      ]);

      newComment.id = result.insertId;
      newComment.postId = postId;

      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error adding comment to post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const updatedPostData = req.body; 
      await db.execute('UPDATE posts SET title = ?, body = ? WHERE id = ?', [
        updatedPostData.title,
        updatedPostData.body,
        postId,
      ]);

      res.json(updatedPostData);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateComment: async (req, res) => {
    try {
      const postId = req.params.postId;
      const commentId = req.params.commentId;
      const updatedCommentData = req.body; 
      await db.execute('UPDATE comments SET name = ?, email = ?, body = ? WHERE id = ? AND postId = ?', [
        updatedCommentData.name,
        updatedCommentData.email,
        updatedCommentData.body,
        commentId,
        postId,
      ]);

      res.json(updatedCommentData);
    } catch (error) {
      console.error('Error updating comment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const postId = req.params.postId;
      const commentId = req.params.commentId; 
      await db.execute('DELETE FROM comments WHERE id = ? AND postId = ?', [commentId, postId]);

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

  login: (req, res) => {
    const { username, password } = req.body; 
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) { 
      const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
};
