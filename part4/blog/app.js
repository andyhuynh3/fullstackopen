const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to MongoDB'))
  .catch(() => logger.error('Failed to connect to MongoDB'));

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

app.use(middleware.errorHandler);

module.exports = app;
