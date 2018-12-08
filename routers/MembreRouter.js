var express = require('express');
var routerMembres = express.Router();
var MembreController = require('../controllers/MembreController');
var UserController = require('../controllers/UserController');

routerMembres.use(UserController.verifjeton)
routerMembres.get('', MembreController.liste);
routerMembres.get('/', MembreController.liste);
routerMembres.get('/:id', MembreController.getUnMembre);
routerMembres.post('/', MembreController.ajouterUnMembre);
routerMembres.put('/', MembreController.modifierUnMembre);
routerMembres.delete('/:id', MembreController.supprimerUnMembre)


// interface du module
module.exports = routerMembres;

