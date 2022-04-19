require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/apiRoutes');
const authRouter = require('./routes/authRoutes');

// connect to database
mongoose
  .connect(process.env.MONGOSERVER)
  .finally(() => console.log('connected to database'));

// api links
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.get('/test', (req, res) => res.json({ foo: 'bar' }));

app.listen(process.env.PORT || 3001, () =>
  console.log('listening on port 3001')
);
