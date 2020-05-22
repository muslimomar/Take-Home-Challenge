const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;
const {ObjectId} = Schema.Types;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config');

/*********************************************************/
/** User model**/
/*********************************************************/
const schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        minlength: 1,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    integer: {
        type: Number,
        default: 1
    }
}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true
});

if (!schema.options.toJSON) schema.options.toJSON = {};
schema.options.toJSON.transform = function (doc, ret, options) {

    let hide = 'updatedAt id password';
    if (options.hide) hide += ' ' + options.hide;


    hide.split(' ').forEach(prop => delete ret[prop]);

    return ret;
};


schema.pre('save', function (next) {

    let user = this;

    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10)
            .then((hash) => {

                user.password = hash;
                next();
            })
            .catch(next)
    } else {
        next();
    }

});

/* Statics */

schema.methods.generateAuthToken = function () {
    let user = this;

    const payload = {
        _id: user._id.toHexString()
    };

    return new Promise((rs, rj) => {
        const token = jwt.sign(
            payload,
            config.get('JWT_SECRET')
        ).toString();

        mongoose.model('UserSession')
            .create({
                token,
                user: user._id
            })
            .then((session) => rs(session.token))
            .catch(rj);
    });

};

schema.methods.verifyPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

schema.query.byCredentials = async function (email, password) {

    const user = await this.findOne({email}, '+password');
    if (!user) return null;

    const isCorrectPassword = await user.verifyPassword(password);

    if (isCorrectPassword) return user;
    else return null;
};

schema.statics.validateSchema = (object, pickKeys, requiredKeys) => {

    let rules = {
        fullName: Joi.string().trim().min(1).required(),
        email: Joi.string().trim().min(1).email().required(),
        password: Joi
            .string()
            .min(8)
            .max(300)
            .required(),
        integer: Joi.number().min(0).required()
    };

    if (Array.isArray(pickKeys) && pickKeys.length > 0) {
        rules = _.pick(rules, pickKeys)
    }

    return Joi
        .object(rules)
        .validate(object, {abortEarly: false});
};

exports.User = mongoose.model('User', schema);

/*********************************************************/
/** User Session model**/
/*********************************************************/

const sessionSchema = Schema({
    token: {
        type: String,
        index: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        index: true
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    },
    versionKey: false
});

exports.UserSession = mongoose.model('UserSession', sessionSchema, 'userSessions');
