var express = require('express');
var router = express.Router();
var Types = require('../models/Types');

/* GET types listing. */
router.get(
  '/:id?',
  function(request, response, next) {
      // Fonction appelée après décodage de l'URI (http://localhost:3000/19)

      if (request.params.id) {
          // Un paramètre est passé
          Types.getTypeById(request.params.id, function(err, rows) {
              if (err) {
                  response.json(err);
              } else {
                  response.json(rows);
              }
          });
      } else {
          Types.getAllTypes(function(err, rows) {
              if (err) {
                  response.json(err);
              } else {                    
                  response.json(rows);
              }
          });
      }
  }
);

module.exports = router;
