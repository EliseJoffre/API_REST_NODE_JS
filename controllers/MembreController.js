var Membre = require('../models/MembreModel');

var MembreController = {

    // Fonction qui va récupérer et afficher le nom et le prénom de tous les membres

    liste: function (req, res) {

        Membre.find({}, {_id: 0, nom: 1, prenom: 1})
            .then((membres) => membres != null ? res.json({
                "status": true,
                "message": membres
            }) : res.json({"status": false, "message": 'Inexistant'}))
            .catch((err) => console.log(err));

    },

    // Fonction qui va récupérer et afficher un membre en fonction de son nom et de son prénom

    getUnMembre: function (req, res) {
        Membre.find({id: req.params.id}, {_id: 0, id: 1, nom: 1, prenom: 1})
            .then((membre) => membre != null ? res.json({"status": true, "membre": membre}) : res.json({
                "status": false,
                "message": "membre inexistant"
            }))
            .catch((err) => console.log(err));

    },

    //Fonction qui va ajouter un membre en vérifiant que l'ID n'existe pas déjà

    ajouterUnMembre: function (req, res) {

        Membre.findOne({id: req.body.id}, {_id: 1}).then((membre) => {

            if (membre != null) {
                res.json({"status": false, "message": "un membre avec cet id existe déjà"})
            } else {

                let newMembre = new Membre(req.body);

                newMembre.validate().then(() => {
                    return newMembre.save();
                })
            }
        }).then(() => res.json({"status": true, "membre": "membre ajouté"}))
            .catch((err) => res.json({"status": false, "message": "membre validation failed : " + err.message}))

    },

    //Fonction qui va modifier un membre  en vérifiant qu'il existe bien déjà

    modifierUnMembre: function (req, res) {

        Membre.findOneAndUpdate({id: req.body.id}, req.body, {new: true}, function (err, membre) {

            if (membre == null) {
                res.json({"status": false, "message": "membre inexistant"})
            }

            res.status(500);
            res.json({"status": false, "membre": "membre validation failed: " + membre})

        }).then(() => res.json({"status": true, "membre": "membre modifié"}))

    },

    //Fonction qui va supprimer un membre  en vérifiant qu'il existe bien déjà

    supprimerUnMembre: function (req, res) {

        Membre.findOne({id: req.params.id}, {_id: 1}).then((membre) => {

            if (membre == null) {
                res.json({"status": false, "message": "membre inexistant"})
            } else {

                membre.remove()
            }
        }).then(() => res.json({"status": true, "membre": "membre supprimé"}))
            .catch((err) => console.log(err.message))

    },


}

module.exports = MembreController;