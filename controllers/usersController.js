const { users } = require('../data/users.json');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const db = require('../db');

module.exports = {
  getAllUsers: (req, res) => {
    res.json(users);
  },

  login: (req, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  },

  getUserPosts: async (req, res) => {
    try {
      const userId = req.params.userId;

      
      const [rows, fields] = await db.execute('SELECT * FROM posts WHERE userId = ?', [userId]);

      res.json(rows);  
    } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
