var User = require('../models/UserModel');
var jwt = require("jsonwebtoken");

var UserController = {
    liste: function (req, res) {

        User.find({}, {_id: 0, name: 1, mail: 1})
            .then((users) => users != null ? res.json({
                "status": true,
                "message": users
            }) : res.json({"status": false, "message": 'Inexistant'}))
            .catch((err) => console.log(err));

    },

    ajout: function (req, res) {

        User.findOne({mail: req.body.mail}, {_id: 1}).then((user) => {

            if (user != null) {
                res.json({"status": false, "message": "un utilisateur avec cet id existe déjà"})
            } else {
                let newUser = new User(req.body);

                newUser.validate().then(() => {
                    return newUser.save();
                })
            }
        }).then(() => res.json({"status": true, "user": "user ajouté"}))
            .catch((err) => res.json({"status": false, "message": "user validation failed : " + err.message}))

    },

    demandejeton: function (req, res) {
        if (req.body.name == null || req.body.password == null) {
            res.json({status: false, message: "name et/ou password absents"})

        } else {
            User.findOne({name: req.body.name, password: req.body.password}, {_id: 1}).then((user) => {

                if (user != null) {

                    var payload = {username: user.name, password: user.password, admin: user.admin}

                    var token = jwt.sign(payload, 'maclesecrete', {expiresIn: 3600});
                    res.json({status: true, message: token})
                } else {
                    res.json({status: false, message: "name et/ou password incorrects"})

                }
            })
        }
    },

    verifjeton: function (res, token) {

        let test;
        if (token != null) {
            jwt.verify(token, 'maclesecrete',
                function (err, payload) {
                    if (err) {
                        test = false;
                        res.json({status: false, message: 'token incorrect : ' + err.message});
                    } else {
                        test = true;
                    }
                })
        } else {
            res.json({status: false, message: 'token absent'});
            test = false;
        }

        return test;
    },

    verifAdmin: function (res, token) {

    }

    }


module.exports = UserController;