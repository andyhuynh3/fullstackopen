const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');
const config = require('./utils/config');
const logger = require('./utils/logger');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to MongoDB'))
  .catch(() => logger.error('Failed to connect to MongoDB'));

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;
