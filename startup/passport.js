module.exports = (app) => {
    const passport = require('passport');
    const config = require('config');
    const passportJWT = require("passport-jwt");
    const JwtStrategy = passportJWT.Strategy;
    const ExtractJwt = passportJWT.ExtractJwt;

    const {User} = require('../models/User');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    /*********************/
    /** JWT Strategy **/
    /*********************/

    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.get('JWT_SECRET');

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

        User.findById(jwt_payload._id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }).catch((e) => {
            return done(e, false);
        });

    }));

};
