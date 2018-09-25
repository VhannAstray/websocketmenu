// Récupérer l'instance de connexion à la base de données
var db = require('../dbconnection');

/**
 * @name Types Classe modèle pour la gestion des types de plats
 */
var Types = {
    /**
     * Retourne une Types à partir de son id
     * @param {*} id 
     * @param {*} callback 
     */
    getTypeById(id, callback) {
        return db.query(
           "SELECT * FROM Types WHERE id=?",
           [id],
           callback
        );
    },

    /**
     * @name getAllTypes(void): query
     * Exécute une requête pour récupérer la totalité des Types
     */
    getAllTypes: function(callback) {
        return db.query("SELECT * FROM Types ORDER BY libelle", callback);
    },

    /**
     * Retourne le dernier Types créé
     */
    getLastTypes: function(callback) {
        return db.query(
            "SELECT * FROM Types ORDER BY id DESC LIMIT 0,1;",
            callback
        )
    },
    
    /**
     * @name addTypes(Types, callback)
     * Ajoute un Types dans la table concernée
     */
    addTypes: function(Types, callback) {
        console.log('Add ' + JSON.stringify(Types));
        return db.query(
            "INSERT INTO Types (titre, instructions, temps_preparation, temps_cuisson, nb_personnes, utilisateurs_id, types_id)"+
            "VALUES (?,?,?,?,?,?,?);",
            [
                Types.titre,
                Types.instructions,
                Types.temps_preparation,
                Types.temps_cuisson,
                Types.nb_personnes,
                Types.utilisateurs_id,
                Types.types_id
            ],
            callback
        );
    },

    /**
     * @name updateTypes(int id, Types Types)
     * @param {int} id 
     * @param {Types} Types 
     * @param {*} callback 
     */
    updateTypes(id, Types, callback) {
        return db.query(
            "UPDATE Types SET titre=? WHERE id=?;",
            [Types.titre, id],
            callback
        )
    },

    /**
     * @name deleteTypes(int id, callback)
     * @param {*} id 
     * @param {*} callback 
     */
    deleteTypes(id, callback) {
        return db.query(
            "DELETE FROM Types WHERE id=?;",
            [id],
            callback
        );
    },

     /**
     * Retourne les Types à une date donnée
     */
    getTypesByDate: function(date, callback) {
        return db.query(
            "SELECT titre FROM Types r, menu m, planning p WHERE Types_id = r.id AND planning_id = p.id AND p.date = ?",
            [date],
            callback
        )
    }
};

// Exposer la classe en l'exportant
module.exports = Types;