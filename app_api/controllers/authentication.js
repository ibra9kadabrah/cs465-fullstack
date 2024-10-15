const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
  console.log('Register attempt:', req.body);  // Debug log
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    console.log('Missing fields in registration');
    return res.status(400).json({ "message": "All fields required" });
  }

  try {
    const user = new User();
    user.name = name;
    user.email = email;
    user.setPassword(password);
    await user.save(); // Use await instead of callback
    const token = user.generateJwt();
    console.log('Registration successful, token generated');
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(400).json(err);
  }
};

const login = (req, res) => {
  console.log('Login attempt:', req.body);  // Debug log
  const { email, password } = req.body;
  
  if (!email || !password) {
    console.log('Missing fields in login');
    return res.status(400).json({ "message": "All fields required" });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json(err);
    }
    if (user) {
      const token = user.generateJwt();
      console.log('Login successful, token generated');
      return res.status(200).json({ token });
    } else {
      console.log('Authentication failed:', info);
      return res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};
