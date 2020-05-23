const User = require('../models/user'); 
var passport = require('passport');
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 


const LocalStrategy = require('passport-local').Strategy; 
passport.use(new LocalStrategy(User.authenticate())); 

module.exports = passport;