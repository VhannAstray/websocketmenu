/**
 * Service de connexion à la base de données mysql
 * @version 0.1.0
 */

 /**
  * Instance du driver de connexion mySQL
  */
var mysql = require('mysql');

/**
 * Instance de connexion à la base de données "kitchen"
 */
var connexion = mysql.createPool ({
    host: 'localhost', // localhost
    user: 'kitchen_dba',
    password: '@EL!0n',
    database: 'kitchen',
	port: 3307
});

module.exports = connexion;