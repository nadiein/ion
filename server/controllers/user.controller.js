const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

let User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    let user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {

        if (!err) {
            res.send(doc);
        } else {
            if (err.code == 11000) {
                res.status(422).send(['Duplicate email adrress found.']);
            } else {
                return next(err);
            }
        }

    });
}

module.exports.authenticate = (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {

        if (err) {
            return res.status(400).json(err);
        } else if (user) {
            return res.status(200).json({ "token": user.generateJwt() });

        } else {
            return res.status(404).json(info);
        }
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {

    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user) {
                return res.status(404).json({ status: false, message: 'User record not found.' });
            } else {
                return res.status(200).json({ status: true, user: _.pick(user, ['_id', 'fullName', 'email']) });
            }
        }
    );
}

module.exports.updateProfile = (req, res, next) => {
    User.update({ _id: req.body._id }, { fullName: req.body.fullName, email: req.body.email }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            if (err.code == 11000) {
                res.status(422).send(['Duplicate email adrress found.']);
            } else {
                return next(err);
            }
        }
    })
}
