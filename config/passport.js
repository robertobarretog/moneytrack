import passportJwt from 'passport-jwt';
import mongoose from 'mongoose';
import { secretOrKey } from './keys.js';

const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

export default passport => {
  passport.use(
    new passportJwt.Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .select('-password -date')
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
