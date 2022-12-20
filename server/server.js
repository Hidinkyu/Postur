const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { MONGODB } = require('../config.js');

const app = express();

const postRouter = require('./routes/Posts.js');
const userRouter = require('./routes/Users.js');

app.use(express.json());

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to DB'))
  .catch(console.error);

app.use('/api/posts', postRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use((err, req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000);
