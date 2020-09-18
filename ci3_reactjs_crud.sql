-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2020 at 03:38 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ci3_reactjs_crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` varchar(10) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `post_title` varchar(100) NOT NULL,
  `post_content` longtext NOT NULL,
  `post_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `user_id`, `post_title`, `post_content`, `post_date`) VALUES
('POST001', 'USER001', 'Ini Judul', 'I just cant love no ones, as long as hard as you,  cause all the world, have nothing on you', '2020-09-01'),
('POST002', 'USER001', 'Uji Coba 2 diedeit', 'I like your eyes you look around when you pretend not to care, i like the dimples on the corner if you smile that you were. I like you more the world, baby but don\'t be scared, cause i\'m falling deeper baby be prepared. I like your shirt i like your finger love the way that you smell, to be your favourite jacket just so i can be always be near, i love you thousand years sometimes it\'s hard to bear, but after all this time i hope you wait and see..\nLove you every minute every second, love you anywhere and any moment. Never knew a love like this, but i can\'t let go, you\'re the only one, i don\'t know how.. Love you till the rest of snow disappear, love till the rainy day becomes clear, never knew  love like this, but i can\'t let go, i\'m in love with you and now you know..', '2020-09-02'),
('POST003', 'USER001', 'Skandal Politik Indonesia', 'Jkw bukanlah boneka, tapi orang-orangan sawah. Mgwt adalah orang yang membelikan Jkw kursi. Namun, madam Mgwt bukanlah dalang utama atas segalanya, masih ada pemain utama dalam \'drama\' ini. Dialah orang yang memegang kendali penuh atas apa yang terjadi di dunia politik negara ini.', '2020-09-03'),
('POST004', 'USER002', 'Uji Coba', 'ssdsd\n', '2020-09-07'),
('POST005', 'USER003', 'Bum Bum', 'Saka saka bumbum', '2020-09-07');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(10) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_phone` varchar(14) NOT NULL,
  `user_status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_status`) VALUES
('USER001', 'Jakun', 'jakun@gudlah.com', 'passwordjakun', '085794145658', '1'),
('USER002', 'Reza Firdaus', 'rmeureun@gmail.com', 'passwordreza', '0895372765849', '0'),
('USER003', 'Azer Suadrif', 'azerus98@gmail.com', 'passwordazer', '081322999845', '0'),
('USER004', 'Xi Jin Ping', 'jinping@china.cn', 'passworsjinping', '085712345678', '0'),
('USER005', 'Donald Trump', 'trump@president.us', 'passwordtrump', '0123423344444', '0'),
('USER006', 'Mantap', 'mantap@patnampatnam.ir', 'passwordmantap', '02134532123444', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
