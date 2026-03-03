const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function authCheck(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.sendStatus(401);
  const token = auth.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.sendStatus(403);
  }
}

app.use(authCheck);
app.use('/auth', createProxyMiddleware({ target: 'http://auth-service:3000', changeOrigin: true }));
app.use('/transfer', createProxyMiddleware({ target: 'http://transfer-service:3000', changeOrigin: true }));
app.use('/audit', createProxyMiddleware({ target: 'http://audit-logs:3000', changeOrigin: true }));

app.listen(PORT, () => console.log(`API Gateway listening on ${PORT}`));
