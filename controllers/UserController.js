var User = require('../models/UserModel');
var jwt = require("jsonwebtoken");
var jws = require("jws");

var UserController = {

    // Fonction qui va récupérer et afficher le nom, le mail, le mot de passe et le statut de tous les users

    liste: function (req, res) {

        User.find({}, {_id: 0, name: 1, mail: 1, password: 1, admin: 1})
            .then((users) => users != null ? res.json({
                "status": true,
                "message": users
            }) : res.json({"status": false, "message": 'Inexistant'}))
            .catch((err) => console.log(err));
    },

    // Fonction qui va ajouter un user vérifiant que son mail est unique

    ajout: function (req, res) {

        User.findOne({mail: req.body.mail}, {_id: 1}).then((user) => {

            if (user != null) {
                res.json({"status": false, "message": "un utilisateur avec cet id existe déjà"})
            } else {
                let newUser = new User(req.body);
                newUser.validate().then(() => {
                    return newUser.save();
                }).then(() => res.json({"status": true, "user": "user ajouté"}))
            }
        }).catch((err) => res.json({"status": false, "message": "user validation failed : " + err.message}))

    },

    // Fonction qui va demander un token en fonction du nom et du password

    demandejeton: function (req, res) {
        if (req.body.name == null || req.body.password == null) {
            res.json({status: false, message: "name et/ou password absents"})

        } else {
            User.findOne({name: req.body.name, password: req.body.password}, {
                _id: 1,
                name: 1,
                password: 1,
                admin: 1,
                mail: 1
            }).then((user) => {

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

    //Middleware qui va vérifier si le token est correct

    verifjeton: function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token != null) {
            jwt.verify(token, 'maclesecrete',
                function (err, payload) {
                    if (err) {

                        res.json({status: false, message: 'token incorrect : ' + err.message});
                    } else {
                        next();
                    }
                })
        } else {
            res.json({status: false, message: 'token absent'});
        }
    },

    //Middleware qui va vérifier que le token est un token d'aministrateur

    verifjwt: function (req, res, next) {
        var token = req.body.token;
        var decoded = jws.decode(token);
        var payload = decoded.payload;

        if (token != null) {
            if (payload.admin) {
                next()
            } else {
                res.json("Vous n'êtes pas un administrateur, vous n'avez donc pas accès à cette page !")
            }
        } else {
            res.json({status: false, message: 'token absent'});
        }

    }

}

module.exports = UserController;