var express = require('express');
var routerUsers = express.Router();
var UserController = require('../controllers/UserController');

routerUsers.get('', UserController.verifjwt, UserController.liste);
routerUsers.post('/', UserController.ajout);
routerUsers.get('/token', UserController.demandejeton);

module.exports = routerUsers;

