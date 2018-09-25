// Récupérer l'instance de connexion à la base de données
var db = require('../dbconnection');

/**
 * @name Recette Classe modèle pour la gestion des Recettes
 */
var Recette = {
    /**
     * Retourne une Recette à partir de son id
     * @param {*} id 
     * @param {*} callback 
     */
    getRecetteById(id, callback) {
        return db.query(
           "SELECT * FROM Recettes WHERE id=?",
           [id],
           callback
        );
    },

    /**
     * @name getAllRecettes(void): query
     * Exécute une requête pour récupérer la totalité des Recettes
     */
    getAllRecettes: function(callback) {
        return db.query("SELECT * FROM recettes ORDER BY titre", callback);
    },

    /**
     * Retourne le dernier Recette créé
     */
    getLastRecette: function(callback) {
        return db.query(
            "SELECT * FROM Recettes ORDER BY id DESC LIMIT 0,1;",
            callback
        )
    },
    
    /**
     * @name addRecette(Recette, callback)
     * Ajoute un Recette dans la table concernée
     */
    addRecette: function(Recette, callback) {
        console.log('Add ' + JSON.stringify(Recette));
        return db.query(
            "INSERT INTO Recettes (title, begin, end) VALUES (?,?,?);",
            [Recette.title, Recette.begin, Recette.end],
            callback
        );
    },

    /**
     * @name updateRecette(int id, Recette Recette)
     * @param {int} id 
     * @param {Recette} Recette 
     * @param {*} callback 
     */
    updateRecette(id, Recette, callback) {
        return db.query(
            "UPDATE Recettes SET title=?,begin=?,end=? WHERE id=?;",
            [Recette.title, Recette.begin, Recette.end, id],
            callback
        )
    },

    /**
     * @name deleteRecette(int id, callback)
     * @param {*} id 
     * @param {*} callback 
     */
    deleteRecette(id, callback) {
        return db.query(
            "DELETE FROM Recettes WHERE id=?;",
            [id],
            callback
        );
    },

     /**
     * Retourne le dernier Recette créé
     */
    getRecetteByDate: function(Recette, callback) {
        return db.query(
            "SELECT titre FROM recettes r, menu m, planning p WHERE recettes_id = r.id AND planning_id = p.id AND p.date = ?",
            [Recette.date],
            callback
        )
    }
};

// Exposer la classe en l'exportant
module.exports = Recette;