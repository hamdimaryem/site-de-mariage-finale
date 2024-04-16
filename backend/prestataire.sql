-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 15 avr. 2024 à 15:10
-- Version du serveur :  10.4.14-MariaDB
-- Version de PHP : 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `prestataire`
--

-- --------------------------------------------------------

--
-- Structure de la table `fleuriste`
--

CREATE TABLE `fleuriste` (
  `id_fleuriste` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `mail` varchar(200) NOT NULL,
  `num_tel` int(8) NOT NULL,
  `localisation` text NOT NULL,
  `avis` text NOT NULL,
  `prix` double NOT NULL,
  `service` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `fleuriste`
--

INSERT INTO `fleuriste` (`id_fleuriste`, `nom`, `mail`, `num_tel`, `localisation`, `avis`, `prix`, `service`) VALUES
(0, '0', '0', 0, '0', '0', 0, ''),
(2, 'nouveau_service', 'nouveau_service', 0, 'nouveau_service', 'nouveau_service', 0, 'nouveau_service'),
(3, 'Nouveau Fleuriste', 'nouveau_fleuriste@gmail.com', 123456789, 'Paris', 'Excellent', 100, 'Livraison de fleurs');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `fleuriste`
--
ALTER TABLE `fleuriste`
  ADD PRIMARY KEY (`id_fleuriste`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
