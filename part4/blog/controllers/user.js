const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const passwordMinLength = 3;

userRouter.post('/', async (request, response) => {
  const { body } = request;

  const saltRounds = 10;
  if (body.password.length < passwordMinLength) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' });
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

userRouter.get('/', async (_, response) => {
  const users = await User.find({}).populate('blogs', {
    url: true, title: true, author: true, id: true,
  });
  return response.json(users);
});

module.exports = userRouter;
