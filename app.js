let mongoose = require('mongoose');
let express = require('express');
let bodyparser = require('body-parser');
var router = express.Router();
var routerMembres = require("./routers/MembreRouter.js")
var routerUsers = require("./routers/UserRouter.js")
var app = express();
var port = 5000;
mongoose.Promise = global.Promise;

app.use(bodyparser.json())

mongoose.connect("mongodb://localhost/CollegeFrance2016",
    {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'erreur connexion :'));
db.once('open', function () {
    console.log('Vous etes connectes à College France 2016 !')
});

app.listen(port);
console.log('le serveur REST est lancé sur le port ' + port);


app.use(router);
router.get('/api', function (req, res) {
    res.send('Bienvenue sur le serveur REST de l’API du Collège de France ');
})

app.use('/api/membres', routerMembres)
app.use('/api/users', routerUsers)
