require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRecipeRouter = require('./routes/apiRecipeRoutes');
const apiUserRouter = require('./routes/apiUserRoutes');
const apiRatingRouter = require('./routes/apiRatingRoute');
const authRouter = require('./routes/authRoutes');
// const https = require('https');

// allow json
app.use(express.json({ limit: '500kb' }));

// connect to database
mongoose
  .connect(process.env.MONGOSERVER)
  .finally(() => console.log('connected to database'));

// api links
app.use('/api', apiRecipeRouter);
app.use('/api', apiUserRouter);
app.use('/api', apiRatingRouter);
app.use('/auth', authRouter);
// console.log(https);

app.listen(process.env.PORT || 3001, () => console.log('listening on 3001'));
