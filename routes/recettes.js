/**
 * @name Recettes Spécification des routes pour accéder à la gestion des tâches
 */

 var express = require('express');
 var router = express.Router();
 var Recette = require('../models/Recette');

router.get(
    '/:id?',
    function(request, response, next) {
        // Fonction appelée après décodage de l'URI (http://localhost:3000/19)

        if (request.params.id) {
            // Un paramètre est passé
            Recette.getRecetteById(request.params.id, function(err, rows) {
                if (err) {
                    response.json(err);
                } else {
                    response.json(rows);
                }
            });
        } else {
            Recette.getAllRecettes(function(err, rows) {
                if (err) {
                    response.json(err);
                } else {
                    response.json(rows);
                }
            });
        }
    }
);

/**
 * POST : ajouter une ligne de Recette
 */
router.post('', function(request, response, next) {
    Recette.addRecette(request.body, function(err, count){
        if (err) {
            response.json(err);
        } else {
            // Récupère la dernière ligne ajoutée
            Recette.getLastRecette(function(err, row) {
                if (err) {
                    response.json(err);
                } else {
                    response.json(row);
                }
            });
        }
    });
});

router.put('/:id', function(request, response, next) {
    Recette.updateRecette(request.params.id, request.body, function(err, row) {
        if (err) {
            response.json(err);
        } else {
            request.body.id = request.params.id;
            response.json(request.body);
        }
    })
});

router.delete('/:id', function(request, response, next) {
    Recette.deleteRecette(request.params.id, function(err, count) {
        if (err) {
            response.json(err);
        } else {
            response.json(request.params.id);
        }
    })
});



module.exports = router;