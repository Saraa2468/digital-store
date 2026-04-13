const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to my Digital Store!</h1><p>DevSecOps Pipeline is working.</p>');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});