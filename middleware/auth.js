const passport = require('passport');
const {User, UserSession} = require('../models/User');
const {Forbidden, Unauthorised} = require('./../utils/error');

const auth = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) token = token.split(' ')[1];

    passport.authenticate('jwt', {session: false}, function (err, user, info) {
        if (err) return next(err);

        if (!user) {
            return next(new Unauthorised(undefined, 401));
        }

        UserSession.findOne({
            user: user._id,
            token: token
        }).then((session) => {

            if (!session) {
                return next(new Unauthorised(undefined, 401));
            }

            req.logIn(user, function (err) {
                if (err) return next(err);

                req.user = user;
                req.token = token;
                return next();
            });

        }).catch((err) => {
            return next(err);
        });


    })(req, res, next);
};

exports.auth = (req, res, next) => {
    return auth(req, res, next);
};
