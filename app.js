const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./config'); 
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = usersData.find((user) => user.username === username && user.password === password);
  
  if (user) {
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
}
});

app.use(authenticationMiddleware); 

app.get('/posts', async (req, res) => {
const userId = req.user.userId;

try {
  const [rows, fields] = await db.execute('SELECT * FROM posts WHERE userId = ?', [userId]);
  res.json(rows);
} catch (error) {
  console.error('Error fetching posts:', error.message);
  res.status(500).json({ message: 'Internal Server Error' });
}
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
