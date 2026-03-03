const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const users = [];

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.sendStatus(201);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.sendStatus(401);
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.sendStatus(401);
  const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => console.log(`Auth service listening on ${PORT}`));
