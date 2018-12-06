let mongoose = require('mongoose');
let express = require('express');
let bodyparser = require('body-parser');
var app = express();
var routerMembres = require("./routers/MembreRouter.js")
var routerUsers = require("./routers/UserRouter.js")
mongoose.Promise = global.Promise;

let bodyParser = require('body-parser')
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/CollegeFrance2016",
    {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'erreur connexion :'));
db.once('open', function () {
    console.log('Connecté')
});

var router = express.Router();
var port = 5000;
app.listen(port);
console.log('le serveur REST est lancé sur le port ' + port);


app.use(router);
router.get('/api', function (req, res) {
    res.send('Bienvenue sur le serveur REST de l’API du Collège de France ');
})

app.use('/api/membres', routerMembres)
app.use('/api/users', routerUsers)
