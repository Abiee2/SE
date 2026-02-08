const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));  // Allow React app
app.use(express.json());  // Parse JSON requests

// In-memory storage for demo (data resets on restart)
let profiles = {};
let users = {};  // For login/register

// Register endpoint
app.post('/api/register', (req, res) => {
  const { name, number, password } = req.body;
  const userId = `user-${Date.now()}`;
  users[number] = { userId, password, name };
  profiles[userId] = { settings: {} };
  res.json({ userId });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { number, password } = req.body;
  const user = users[number];
  if (user && user.password === password) {
    res.json({ token: 'dummy-token', userId: user.userId });
  } else {
    res.status(401).json({ message: 'Invalid number or password' });
  }
});

// GET profile
app.get('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  res.json(profiles[userId] || { settings: {} });
});

// PUT profile (saves settings)
app.put('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  profiles[userId] = { ...profiles[userId], ...req.body };
  res.json({ message: 'Profile updated successfully' });
});

app.listen(5000, () => console.log('UAPS Backend running on http://localhost:5000'));