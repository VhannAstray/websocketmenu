# websocketmenu
Websocket de l'application de Bérengère

# Installation

- Pour les dépendances : npm i 
- Pour démarrer le serveur : npm start

# La base de donnée nécessaire

Exporter le script suivant pour obtenir la structure de la database :

/*
SQLyog Community v13.1.1 (64 bit)
MySQL - 5.7.23-0ubuntu0.16.04.1 : Database - kitchen
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `compositions` */

DROP TABLE IF EXISTS `compositions`;

CREATE TABLE `compositions` (
  `ingredients_id` int(11) NOT NULL,
  `recettes_id` int(11) NOT NULL,
  KEY `ingredients_id` (`ingredients_id`),
  KEY `recettes_id` (`recettes_id`),
  CONSTRAINT `compositions_ibfk_1` FOREIGN KEY (`ingredients_id`) REFERENCES `ingredients` (`id`),
  CONSTRAINT `compositions_ibfk_2` FOREIGN KEY (`recettes_id`) REFERENCES `recettes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `expression_quantite` */

DROP TABLE IF EXISTS `expression_quantite`;

CREATE TABLE `expression_quantite` (
  `ingredients_id` int(11) NOT NULL,
  `unites_mesure_id` int(11) NOT NULL,
  KEY `ingredients_id` (`ingredients_id`),
  KEY `unites_mesure_id` (`unites_mesure_id`),
  CONSTRAINT `expression_quantite_ibfk_1` FOREIGN KEY (`ingredients_id`) REFERENCES `ingredients` (`id`),
  CONSTRAINT `expression_quantite_ibfk_2` FOREIGN KEY (`unites_mesure_id`) REFERENCES `unites_mesure` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ingredients` */

DROP TABLE IF EXISTS `ingredients`;

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `ingredients_titre` (`libelle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `menu` */

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `planning_id` int(11) NOT NULL,
  `recettes_id` int(11) NOT NULL,
  `is_midi` tinyint(4) DEFAULT NULL,
  KEY `planning_id` (`planning_id`),
  KEY `recettes_id` (`recettes_id`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`planning_id`) REFERENCES `planning` (`id`),
  CONSTRAINT `menu_ibfk_2` FOREIGN KEY (`recettes_id`) REFERENCES `recettes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `photos` */

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `recettes_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recettes_id` (`recettes_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`recettes_id`) REFERENCES `recettes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `planning` */

DROP TABLE IF EXISTS `planning`;

CREATE TABLE `planning` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `recettes` */

DROP TABLE IF EXISTS `recettes`;

CREATE TABLE `recettes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(200) NOT NULL,
  `instructions` longtext NOT NULL,
  `temps_preparation` int(11) NOT NULL,
  `temps_cuisson` int(11) NOT NULL,
  `nb_personnes` smallint(6) DEFAULT NULL,
  `utilisateurs_id` int(11) NOT NULL,
  `types_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateurs_id` (`utilisateurs_id`),
  KEY `types_id` (`types_id`),
  FULLTEXT KEY `recettes_titre` (`titre`),
  CONSTRAINT `recettes_ibfk_1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`),
  CONSTRAINT `recettes_ibfk_2` FOREIGN KEY (`types_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `types` */

DROP TABLE IF EXISTS `types`;

CREATE TABLE `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(150) NOT NULL,
  `icone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `unites_mesure` */

DROP TABLE IF EXISTS `unites_mesure`;

CREATE TABLE `unites_mesure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `utilisateurs` */

DROP TABLE IF EXISTS `utilisateurs`;

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `secure_key` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

Pour les infos de connections, voir le fichier : dbconnection.js
Il faut un user 'kitchen_dba'

Pour avoir un jeu de test, voici un script d'import :

/*
SQLyog Community v13.0.1 (64 bit)
MySQL - 5.6.40-log : Database - kitchen
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

USE `kitchen`;

/*Data for the table `compositions` */

/*Data for the table `expression_quantite` */

/*Data for the table `ingredients` */

/*Data for the table `menu` */

insert  into `menu`(`planning_id`,`recettes_id`,`is_midi`) values 
(1,2,0),
(2,3,1),
(2,4,0);

/*Data for the table `photos` */

/*Data for the table `planning` */

insert  into `planning`(`id`,`date`) values 
(1,'2018-09-24'),
(2,'2018-09-26');

/*Data for the table `recettes` */

insert  into `recettes`(`id`,`titre`,`instructions`,`temps_preparation`,`temps_cuisson`,`nb_personnes`,`utilisateurs_id`,`types_id`) values 
(2,'Pâte à l\'eau pirouette','',15,15,1,0,1),
(3,'Poulet à la carbonarade','',30,12,2,0,1),
(4,'Mousse au chocolat','Des trucs',10,10,1,0,2),
(6,'Plat chelou','Demerdez vous!',15,10,1,0,1);

/*Data for the table `types` */

insert  into `types`(`id`,`libelle`,`icone`) values 
(1,'Plat',''),
(2,'Dessert',''),
(3,'Entree',' ');

/*Data for the table `unites_mesure` */

/*Data for the table `utilisateurs` */

insert  into `utilisateurs`(`id`,`nom`,`secure_key`) values 
(0,'Jean','123');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

# Features du websocket

Le websocket renvoi que des tableaux JSON :

- Liste de toute les recettes de la base de données :
127.0.0.1:3000/recettes/

- Liste des recettes pour une date donnée :
127.0.0.1:3000/recettes/date/2018-09-26

- Renvoi la recette par id :
127.0.0.1:3000/recettes/2

- Ajout d'une recette :
127.0.0.1:3000/recettes/

Méthode POST avec un tableau JSON :
{
    "titre": "Plat chelou",
    "instructions": "Demerdez vous!",
    "temps_preparation": 15,
    "temps_cuisson": 10,
    "nb_personnes": 1,
    "utilisateurs_id": 0,
    "types_id": 1
}
Remarque : assurez vous que les champs non null soient bien remplis et les utilisateurs/types existent bien.

- Mise à jour d'une recette (elle fonctionne que pour le titre, à adapter en fonction du besoin) :
127.0.0.1:3000/recettes/2

Méthode en PUT avec un tableau JSON:
{
    "titre": "Pâte à l'eau pirouette"
}

- Suppression d'une recette :

Méthode en DELETE :
127.0.0.1:3000/recettes/5

ici ça supprime la recette avec l'id numéro 5.

- Liste de tous les types de plats :
127.0.0.1:3000/typesPlats/

- Type de plats avec un paramètre en ID :
127.0.0.1:3000/typesPlats/1
