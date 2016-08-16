-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 15, 2016 at 08:20 PM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `verbtest_db`
--
CREATE DATABASE IF NOT EXISTS `verbtest_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `verbtest_db`;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
	  `id` int(11) NOT NULL AUTO_INCREMENT,
	  `title` varchar(200) NOT NULL,
	  `content` text NOT NULL,
	  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `date`) VALUES
(1, 'Hunters Article Title', 'Some article body', '2016-08-10 21:28:26'),
(2, 'Hunter''s Article Title', 'Some article body', '2016-08-10 21:53:19');
