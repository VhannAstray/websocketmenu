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
           "SELECT r.id AS id, types_id AS typeMeal, titre, instructions, temps_preparation AS tempsPreparation, temps_cuisson AS tempsCuisson, nb_personnes AS nombrePersonnes, p.url AS photos FROM recettes r LEFT JOIN photos p ON r.id = p.recettes_id WHERE r.id=?",
           [id],
           callback
        );
    },

    /**
     * @name getAllRecettes(void): query
     * Exécute une requête pour récupérer la totalité des Recettes
     */
    getAllRecettes: function(callback) {
        return db.query("SELECT r.id AS id, types_id AS typeMeal, titre, instructions, temps_preparation AS tempsPreparation, temps_cuisson AS tempsCuisson, nb_personnes AS nombrePersonnes, p.url AS photos FROM recettes r LEFT JOIN photos p ON r.id = p.recettes_id", callback);
    },

    /**
     * Retourne le dernier Recette créé
     */
    getLastRecette: function(callback) {
        return db.query(
            "SELECT id, types_id as typeMeal, titre, instructions,"+
            " temps_preparation as tempsPreparation, temps_cuisson as tempsCuisson, "+
            "nb_personnes as nombrePersonnes FROM Recettes ORDER BY id DESC LIMIT 0,1;",
            callback
        )
    },
    
    /**
     * @name addRecette(Recette, callback)
     * Ajoute un Recette dans la table concernée
     */
    addRecette: function(recette, callback) {
        console.log('Add ' + JSON.stringify(recette));
        return db.query(
            "INSERT INTO recettes (titre, instructions, temps_preparation, temps_cuisson, nb_personnes, utilisateurs_id, types_id)"+
            "VALUES (?,?,?,?,?,?,?);",
            [
                recette.titre,
                recette.instructions,
                recette.tempsPreparation,
                recette.tempsCuisson,
                recette.nombrePersonnes,
                0,
                recette.typeMeal
            ],
            callback
        );
    },

    /**
     * @name updateRecette(int id, Recette Recette)
     * @param {int} id 
     * @param {Recette} Recette 
     * @param {*} callback 
     */
    updateRecette(id, recette, callback) {
        return db.query(
            "UPDATE recettes SET titre=? WHERE id=?;",
            [recette.titre, id],
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
            "DELETE FROM recettes WHERE id=?;",
            [id],
            callback
        );
    },

     /**
     * Retourne les recettes à une date donnée
     */
    getRecetteByDate: function(date, callback) {
        return db.query(
            "SELECT titre FROM recettes r, menu m, planning p WHERE recettes_id = r.id AND planning_id = p.id AND p.date = ?",
            [date],
            callback
        )
    },
    /**
     * Retourne les recettes d'un planning donné
     */
    getRecetteByPlanning: function(id, callback) {
        return db.query(
            "SELECT r.id,titre,instructions,temps_preparation as tempsPreparation, "+
            " temps_cuisson as tempsCuisson, nb_personnes as nombrePersonnes,"+
            "types_id as typeMeal, m.is_midi as isMidi FROM recettes r, menu m, planning p WHERE recettes_id = r.id AND planning_id = p.id AND p.id = ?",
            [id],
            callback
        )
    }
};

// Exposer la classe en l'exportant
module.exports = Recette;