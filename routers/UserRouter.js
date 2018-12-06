var express = require('express');
var routerUsers = express.Router();
var UserController = require('../controllers/UserController');

routerUsers.get('', UserController.liste);

routerUsers.get('/', function (req, res, next) {
    UserController.liste(req, res);
})

routerUsers.post('/', UserController.ajout);
routerUsers.get('/token', UserController.demandejeton);
//routerUsers.get('/tokenverif', UserController.verifjeton);

module.exports = routerUsers;

