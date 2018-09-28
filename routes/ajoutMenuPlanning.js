/**
 * @name Recettes Spécification des routes pour accéder à la gestion des tâches
 */

 var express = require('express');
 var router = express.Router();
 var menu = require('../models/MenuPlanning');

/**
 * POST : ajouter une ligne de Recette
 */
router.post('', function(request, response, next) {
    menu.addMenuPlanning(request.body, function(err, count){
        if (err) {
            response.json(err);
        } else {
            // Récupère la dernière ligne ajoutée
            menu.getLastMenu(function(err, row) {
                if (err) {
                    response.json(err);
                } else {
                    response.json(row);
                }
            });
        }
    });
});

router.delete('/:idP/:idR/:isM', function(request, response, next) {
    menu.deleteMenuPlanning(request.params, function(err, count) {
        if (err) {
            response.json(err);
        } else {
            response.json(request.body);
        }
    })
});



module.exports = router;