const {UserSession, User} = require('../models/User');
const {UnprocessableEntity, Unauthorised} = require('../utils/error');

exports.registerUser = async (req, res, next) => {

    const existingUser = await User.countDocuments({email: req.body.email});
    if (existingUser) throw new UnprocessableEntity('The email is already in use');

    let user = await User.create(req.body);
    const token = await user.generateAuthToken();

    res.header('Authorization', token);
    res.sendData(user.toJSON({hide: 'integer'}));
};

exports.logout = async (req, res) => {

    await UserSession.deleteOne({token: req.token});
    req.logout();

    res.sendData();
};

exports.login = async (req, res, next) => {

    let user = await User
        .findOne({})
        .byCredentials(req.body.email, req.body.password);

    if (!user) throw new Unauthorised('Incorrect credentials');

    const token = await user.generateAuthToken();
    res.header('Authorization', token);

    res.sendData(user.toJSON({hide: 'integer'}));
};
