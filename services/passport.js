/* eslint-disable consistent-return */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const {
  googleClientID,
  googleClientSecret,
  facebookClientID,
  facebookClientSecret,
} = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleID: profile.id });
      if (user) {
        return done(null, user);
      }
      const newUser = await new User({ 
        googleID: profile.id,
        displayName: profile.displayName,
        imageUrl: profile.photos[0].value,
      }).save();
      done(null, newUser);
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookClientID,
      clientSecret: facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ facebookID: profile.id });
      if (user) {
        return done(null, user);
      }
      const newUser = await new User({ facebookID: profile.id }).save();
      done(null, newUser);
    },
  ),
);
