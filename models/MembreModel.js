let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let membreSchema = new Schema({
        id: {type: Number, required: true, unique: true},
        annee: {type: Number, required: true},
        nom: {type: String, required: true, uppercase: true},
        prenom: {type: String, required: true, uppercase: true},
        categorie: {type: String, enumValues: ["junior", "senior"], trim: true},
        sexe: {type: String, enumValues: ["Femmes", "Hommes"]},
        cnu: {type: String},
        discipline: {type: String},
        corps: {type: String},
        academie: [{code_academie: {type: String, required: true}, nom: {type: String, required: true}}],
        region: [{code_region: {type: Number}, nom: {type: String}}],
        etablissement: {type: String},

    }
);
var Membre = mongoose.model("membre", membreSchema);

module.exports = Membre;




