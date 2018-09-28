// Récupérer l'instance de connexion à la base de données
var db = require('../dbconnection');

/**
 * @name MenuPlanning Classe modèle pour la gestion des MenuPlanning de plats
 */
var MenuPlanning = {
    /**
     * Retourne une MenuPlanning à partir de son id
     * @param {*} id 
     * @param {*} callback 
     */
    getTypeById(id, callback) {
        return db.query(
           "SELECT * FROM MenuPlanning WHERE id=?",
           [id],
           callback
        );
    },

    /**
     * @name getAllMenuPlanning(void): query
     * Exécute une requête pour récupérer la totalité des MenuPlanning
     */
    getAllMenuPlanning: function(callback) {
        return db.query("SELECT * FROM MenuPlanning ORDER BY libelle", callback);
    },

    /**
     * Retourne le dernier MenuPlanning créé
     */
    getLastMenu: function(callback) {
        return db.query(
            "SELECT * FROM Menu;",
            callback
        )
    },
    
    /**
     * @name addMenuPlanning(MenuPlanning, callback)
     * Ajoute un MenuPlanning dans la table concernée
     */
    addMenuPlanning: function(MenuPlanning, callback) {
        console.log('Add ' + JSON.stringify(MenuPlanning));
        return db.query(
            "INSERT INTO menu (planning_id, recettes_id, is_midi)"+
            "VALUES (?,?,?);",
            [
                MenuPlanning.planning_id,
                MenuPlanning.recettes_id,
                MenuPlanning.is_midi
            ],
            callback
        );
    },

    /**
     * @name updateMenuPlanning(int id, MenuPlanning MenuPlanning)
     * @param {int} id 
     * @param {MenuPlanning} MenuPlanning 
     * @param {*} callback 
     */
    updateMenuPlanning(id, MenuPlanning, callback) {
        return db.query(
            "UPDATE MenuPlanning SET titre=? WHERE id=?;",
            [MenuPlanning.titre, id],
            callback
        )
    },

    /**
     * @name deleteMenuPlanning(int id, callback)
     * @param {*} id 
     * @param {*} callback 
     */
    deleteMenuPlanning(menuplanning, callback) {
        console.log("Affichage du delete");
        console.log(menuplanning);        
        return db.query(
            "DELETE FROM menu WHERE planning_id=? AND recettes_id=? AND is_midi=?;",
            [
                menuplanning.idP,
                menuplanning.idR,
                menuplanning.isM
            ],
            callback
        );        
    },

     /**
     * Retourne les MenuPlanning à une date donnée
     */
    getMenuPlanningByDate: function(date, callback) {
        return db.query(
            "SELECT titre FROM MenuPlanning r, menu m, planning p WHERE MenuPlanning_id = r.id AND planning_id = p.id AND p.date = ?",
            [date],
            callback
        )
    }
};

// Exposer la classe en l'exportant
module.exports = MenuPlanning;