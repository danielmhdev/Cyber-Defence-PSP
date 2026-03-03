const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// simple event storage placeholder
const events = [];

app.post('/event', (req, res) => {
  events.push(req.body);
  res.sendStatus(201);
});

app.get('/events', (req, res) => {
  res.json(events);
});

app.listen(PORT, () => console.log(`Audit logs service listening on ${PORT}`));
