var express = require('express');
var routerMembres = express.Router();
// utilisation du controlleur de gestion des sportifs
var MembreController = require('../controllers/MembreController');
var UserController = require('../controllers/UserController');

// route pour la liste des sportifs
// utilisant la méthode liste du controlleur

function middleware(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(UserController.verifjeton(res,token) == true){
        next();
    }
};
routerMembres.use(middleware)
routerMembres.get('',MembreController.liste);
routerMembres.get('/', MembreController.liste);
routerMembres.get('/:id', MembreController.getUnMembre);
routerMembres.post('/', MembreController.ajouterUnMembre);
routerMembres.put('/', MembreController.modifierUnMembre);
routerMembres.delete('/:id', MembreController.supprimerUnMembre)


// interface du module
module.exports = routerMembres;

