/**
 * @file Implements an Express Node HTTP server.
 */
const express = require('express');
const app = express();
app.use(express.json());

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(PORT);
