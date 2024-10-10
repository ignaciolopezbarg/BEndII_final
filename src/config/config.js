import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.token]),
  secretOrKey: process.env.JWT_SECRET,
};

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;


// import passport from "passport";
// import jwt from "passport-jwt";
// const JWTStrategy = jwt.Strategy;
// const ExtractJwt = jwt.ExtractJwt;
// import dotenv from 'dotenv';

// const initializePassport = () => {
//     passport.use("jwt", new JWTStrategy({
//         jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//         secretOrKey: "coderhouse"
//     }, async (jwt_payload, done) => {
//         try {
//             return done(null, jwt_payload);
//         } catch (error) {
//             return done(error);
//         }
//     }))
// }

// const cookieExtractor = (req) => {
//     let token = null;
//     if(req && req.cookies) {
//         token = req.cookies["coderCookieToken"]
//     }
//     return token;
// }

// export default initializePassport;