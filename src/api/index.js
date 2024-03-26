require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require('jsonwebtoken');

mongoose
  .connect(
    'mongodb+srv://sengar:sengar123@cluster0.h8dnflv.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0',
  )
  .then(() => {
    console.log('connected to Mongoose');
  })
  .catch(err => {
    console.log('err in mongodb', err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log('server listening on port', port);
app.listen(port, () => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('server listening on port', port);
  });
});

const User = require('./models/users');
// const Message = require('./models/message');

// end points for ragistration of the user

app.post('/register', async (req, res) => {
  const {name, email, password, image} = req.body;

  //   create new user
  const newUser = new User({
    name,
    email,
    password,
    image,
  });

  // save the user to the database

  await newUser
    .save()
    .then(() => {
      res.status(200).json({
        massage: 'user registered ssdfuccessfully',
        user: {_id, name, email, password, image},
      });
    })
    .catch(err => {
      console.log('err in ragister user', err);
      res.status(500).json({massage: 'error in ragister user'});
    });
});
