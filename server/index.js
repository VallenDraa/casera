require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { signUp, login, saveRecipe } = require('./api/api');

// allow json to be sent via body
app.use(express.json());

// connect to database
mongoose
  .connect(process.env.MONGOSERVER)
  .finally(() => console.log('connect to database'));

// api links

// sign up
app.post('/api/sign-up', signUp);
// login
app.get('/api/login', login);

// recipes
// save
app.put('/api/recipe/save', saveRecipe);

app.listen(process.env.PORT || 8000, () =>
  console.log('listening on port 8000')
);
