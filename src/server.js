const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(morgan('dev')); // Logging
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

passport.use(new SamlStrategy(
  {
    path: '/login/callback',
    entryPoint: 'http://localhost:8080/auth/realms/GetsConnect/protocol/saml', // Replace with your IdP entry point
    issuer: 'saml-login',
    // You may also need to include a certificate and private key, depending on your IdP
  },
  function(profile, done) {
    // Here you can extract any details you need from the profile argument
    return done(null, profile);
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

app.post('/login/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

app.listen(3001, () => console.log('Server started on port 3001.'));
