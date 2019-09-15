const { resolve } = require('path');
const express = require('express');
const configureAPI = require('./configure');

const app = express();

const { PORT = 3000 } = process.env;

// API
configureAPI(app);

// UI
const publicPath = resolve(__dirname, '../../dist');
const staticConf = { maxAge: '1y', etag: false };

app.use(express.static(publicPath, staticConf));
app.use((req, res) => {
  res.sendFile(resolve(publicPath, 'index.html'));
});

// Go
app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
