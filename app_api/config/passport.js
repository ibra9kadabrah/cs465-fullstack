const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' 
  },
  async (username, password, done) => { 
    try {
      const user = await User.findOne({ email: username }); 
      if (!user) {
        console.log('Incorrect email.');
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        console.log('Incorrect password.');
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('Authentication successful for user:', user.email);
      return done(null, user);
    } catch (err) {
      console.error('Passport error:', err);
      return done(err);
    }
  }
));
