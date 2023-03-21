-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2023 at 08:00 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scholarly`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `stuid` int(11) NOT NULL,
  `sch_id` int(11) NOT NULL,
  `sponid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`stuid`, `sch_id`, `sponid`) VALUES
(1, 5, 1),
(1, 8, 2),
(2, 6, 2),
(3, 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `scholarship`
--

CREATE TABLE `scholarship` (
  `sch_id` int(11) NOT NULL,
  `sponid` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `shdescription` varchar(1000) NOT NULL,
  `no_of_scholarships` int(11) DEFAULT NULL,
  `shamount` int(11) NOT NULL,
  `deadline` date NOT NULL,
  `eligibility` varchar(1000) NOT NULL,
  `postdate` date NOT NULL,
  `other_support` varchar(1000) DEFAULT NULL,
  `related_link` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scholarship`
--

INSERT INTO `scholarship` (`sch_id`, `sponid`, `title`, `shdescription`, `no_of_scholarships`, `shamount`, `deadline`, `eligibility`, `postdate`, `other_support`, `related_link`) VALUES
(5, 1, 'Scholarship for B.Tech', 'Scholarship for B.Tech students', 10, 10000, '2024-01-01', 'B.Tech', '2020-01-01', 'None', 'None'),
(6, 2, 'Scholarship for M.Tech', 'Scholarship for M.Tech students', 10, 10000, '2024-01-01', 'M.Tech', '2020-01-01', 'None', 'None'),
(7, 3, 'Scholarship for PhD', 'Scholarship for PhD students', 10, 10000, '2024-01-01', 'PhD', '2020-01-01', 'None', 'None'),
(8, 2, 'Scholarship for high school', 'Scholarship for High school students', 10, 10000, '2024-01-01', '8th', '2020-01-01', 'None', 'None');

-- --------------------------------------------------------

--
-- Table structure for table `selection`
--

CREATE TABLE `selection` (
  `stuid` int(11) NOT NULL,
  `sch_id` int(11) NOT NULL,
  `sponid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `selection`
--

INSERT INTO `selection` (`stuid`, `sch_id`, `sponid`) VALUES
(1, 5, 1),
(1, 8, 2),
(2, 6, 2),
(3, 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sponsor`
--

CREATE TABLE `sponsor` (
  `sponid` int(11) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `typeIS` varchar(20) DEFAULT NULL,
  `profession` varchar(30) DEFAULT NULL,
  `spaddress` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `sppassword` varchar(30) DEFAULT NULL,
  `emailid` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sponsor`
--

INSERT INTO `sponsor` (`sponid`, `fname`, `lname`, `typeIS`, `profession`, `spaddress`, `pincode`, `phone`, `sppassword`, `emailid`) VALUES
(1, 'Jack', 'Sparrow', 'Individual', 'Actor', 'Caribbean Islands', '123456', 8219343213, 'Capt!onJackSparrow', 'jacksparrow@gmail.com'),
(2, 'John', 'Wick', 'Individual', 'Ex-hitman', 'New York', '123456', 8219343211, 'JohnW!ck', 'wick@gmail.com'),
(3, 'Tony', 'Stark', 'Individual', 'CEO', 'New York', '123456', 8219343212, 'IronMan', 'ironman@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `stuid` int(11) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `staddress` varchar(100) DEFAULT NULL,
  `pincode` varchar(50) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `stupassword` varchar(50) DEFAULT NULL,
  `emailid` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `cur_qual` varchar(50) DEFAULT NULL,
  `basic_qual` varchar(50) DEFAULT NULL,
  `master_qual` varchar(50) DEFAULT NULL,
  `other_qual` varchar(50) DEFAULT NULL,
  `stresume` varchar(50) DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`stuid`, `fname`, `lname`, `staddress`, `pincode`, `phone`, `stupassword`, `emailid`, `dob`, `cur_qual`, `basic_qual`, `master_qual`, `other_qual`, `stresume`, `photo`) VALUES
(1, 'Alien', 'X', 'Knowhere', 'kn202', 2224189021, 'AlienX', 'alien@gmail.com', '1999-01-01', 'B.Tech', 'B.Tech', 'M.Tech', 'PhD', 'AlienX.pdf', 'AlienX.jpg'),
(2, 'Peter', 'Parker', 'New York', 'ny202', 2224189022, 'Spiderman', 'spiderman@gmail.com', '1999-01-01', 'B.Tech', 'B.Tech', 'M.Tech', 'PhD', 'Spiderman.pdf', 'Spiderman.jpg'),
(3, 'Bruce', 'Banner', 'New York', 'ny202', 2224189023, 'Hulk', 'hulk@gmail.com', '1999-01-01', 'B.Tech', 'B.Tech', 'M.Tech', 'PhD', 'Hulk.pdf', 'Hulk.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`stuid`,`sch_id`),
  ADD KEY `sch_id` (`sch_id`),
  ADD KEY `sponid` (`sponid`);

--
-- Indexes for table `scholarship`
--
ALTER TABLE `scholarship`
  ADD PRIMARY KEY (`sch_id`),
  ADD KEY `sponid` (`sponid`);

--
-- Indexes for table `selection`
--
ALTER TABLE `selection`
  ADD PRIMARY KEY (`stuid`,`sch_id`),
  ADD KEY `sch_id` (`sch_id`),
  ADD KEY `sponid` (`sponid`);

--
-- Indexes for table `sponsor`
--
ALTER TABLE `sponsor`
  ADD PRIMARY KEY (`sponid`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`stuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `scholarship`
--
ALTER TABLE `scholarship`
  MODIFY `sch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sponsor`
--
ALTER TABLE `sponsor`
  MODIFY `sponid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `stuid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`stuid`) REFERENCES `student` (`stuid`),
  ADD CONSTRAINT `application_ibfk_2` FOREIGN KEY (`sch_id`) REFERENCES `scholarship` (`sch_id`),
  ADD CONSTRAINT `application_ibfk_3` FOREIGN KEY (`sponid`) REFERENCES `sponsor` (`sponid`);

--
-- Constraints for table `scholarship`
--
ALTER TABLE `scholarship`
  ADD CONSTRAINT `scholarship_ibfk_1` FOREIGN KEY (`sponid`) REFERENCES `sponsor` (`sponid`);

--
-- Constraints for table `selection`
--
ALTER TABLE `selection`
  ADD CONSTRAINT `selection_ibfk_1` FOREIGN KEY (`stuid`) REFERENCES `student` (`stuid`),
  ADD CONSTRAINT `selection_ibfk_2` FOREIGN KEY (`sch_id`) REFERENCES `scholarship` (`sch_id`),
  ADD CONSTRAINT `selection_ibfk_3` FOREIGN KEY (`sponid`) REFERENCES `sponsor` (`sponid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
