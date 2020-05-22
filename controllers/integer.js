const {User} = require('../models/User');
const error = require('../utils/error');

exports.getCurrentInteger = async (req, res) => {

    res.sendData(req.user.integer);
};

exports.getNextInteger = async (req, res) => {

    req.user.integer += 1;
    await req.user.save();

    res.sendData(req.user.integer);
};

exports.resetCurrentInteger = async (req, res) => {

    req.user.set(req.body);
    await req.user.save();

    res.sendData(req.user.integer);
};
