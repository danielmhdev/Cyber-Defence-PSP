const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post('/transfer', (req, res) => {
  // transfer logic placeholder
  res.json({ status: 'ok' });
});

app.listen(PORT, () => console.log(`Transfer service listening on ${PORT}`));
