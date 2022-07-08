-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 11, 2021 at 04:06 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS StudenBook;
USE StudenBook;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studenbook`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `Id_City` int(100) NOT NULL,
  `Id_Country` int(100) NOT NULL,
  `Name_City` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`Id_City`, `Id_Country`, `Name_City`) VALUES
(1, 1, 'Bucuresti'),
(2, 1, 'Iasi'),
(3, 1, 'Cluj-Napoca'),
(4, 1, 'Alba-Iulia'),
(5, 1, 'Timisoara'),
(6, 2, 'Chișinău'),
(7, 2, 'Bălți'),
(8, 2, 'r. Cahul'),
(9, 2, 'r. Cahul, sat. Crihana Veche');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `Id_Country` int(100) NOT NULL,
  `Name_Country` varchar(50) NOT NULL,
  `Value_country` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`Id_Country`, `Name_Country`, `Value_country`) VALUES
(1, 'Romania', 'RO'),
(2, 'Republica Moldova', 'MD');

-- --------------------------------------------------------

--
-- Table structure for table `country_city`
--

CREATE TABLE `country_city` (
  `Id_country` int(100) NOT NULL,
  `Id_city` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `Id_Faculty` int(100) NOT NULL,
  `Name_Faculty` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`Id_Faculty`, `Name_Faculty`) VALUES
(1, 'Facultatea de Business și Administrare'),
(2, 'Facultatea de Biologie'),
(3, 'Facultatea de Chimie'),
(4, 'Facultatea de Drept'),
(5, 'Facultatea de Filozofie'),
(6, 'Facultatea de Fizică'),
(7, 'Facultatea de Geografie'),
(8, 'Facultatea de Giologie și Geofizică'),
(9, 'Facultatea de Istorie'),
(10, 'Facultatea de Jurnalism și Studii in Comunicare'),
(11, 'Facultatea de Limbi și Literaturi Străine'),
(12, 'Facultatea de Litere'),
(13, 'Facultatea de Matematică și Informatică'),
(14, 'Facultatea de Psihologie și Științe ale Educației'),
(15, 'Facultatea de Sociologie și Asistență Socială'),
(16, 'Facultatea de Științe Politice'),
(17, 'Facultatea de Teologie Baptistă'),
(18, 'Facultatea de Teologie Ortodoxă „Justinian Patriarhul”'),
(19, 'Facultatea de teologie romano-catolică'),
(20, 'Departamentul de Educație Fizică și Sport'),
(21, 'Facultatea de Informatică'),
(23, 'Facultatea de Economie și Administrarea Afacerilor'),
(24, 'Facultatea de Geografie și Geologie'),
(25, 'Facultatea de Matematică'),
(26, 'Facultatea de Teologie Ortodoxă'),
(27, 'Facultatea de Filosofie și Științe Social-Politice'),
(28, 'Facultatea de Educație Fizică și Sport'),
(29, 'Facultatea de Chimie și Inginerie Chimică'),
(30, 'Facultatea de Biologie și Geologie'),
(31, 'Facultatea de Știința și Ingineria Mediului'),
(32, 'Facultatea de Istorie și Filozofie'),
(33, 'Facultatea de Științe Economice și Gestiunea Afacerilor'),
(34, 'Facultatea de Studii Europene'),
(35, 'Facultatea de Business'),
(36, 'Facultatea de Ştiințe Politice, Administrative și ale Comunicării'),
(37, 'Facultatea de Teologie greco-catolică'),
(38, 'Facultatea de Teologie Reformată și Muzică'),
(39, 'Facultatea de Teatru și Film'),
(40, 'Facultatea de Inginerie'),
(41, 'Facultatea de Istorie și Filologie'),
(42, 'Facultatea de Științe Economice'),
(43, 'Facultatea de Drept și Științe Sociale'),
(44, 'Facultatea de Teologie Ortodoxă'),
(45, 'Facultatea de Științe Exacte și Inginerești'),
(46, 'Facultatea Electronică și Telecomunicații'),
(47, 'Facultatea Energetică și Inginerie Electrică'),
(48, 'Facultatea Calculatoare, Informatică şi Microelectronică'),
(49, 'Facultatea Tehnologia Alimentelor'),
(50, 'Facultatea Inginerie Mecanică, Industrială şi Transporturi'),
(51, 'Facultatea Urbanism şi Arhitectură'),
(52, 'Facultatea Construcții, Geodezie şi Cadastru'),
(53, 'Facultatea Inginerie Economică şi Business'),
(54, 'Facultatea Textile și Poligrafie'),
(55, 'Facultatea de Științe ale Educației, Psihologie și Arte'),
(56, 'Facultatea de Științe Reale, Economice şi ale Mediului');

-- --------------------------------------------------------

--
-- Table structure for table `faculty_studytype_specdom`
--

CREATE TABLE `faculty_studytype_specdom` (
  `Id_faculty` int(100) NOT NULL,
  `Id_studyType` int(100) NOT NULL,
  `Id_specialization` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `faculty_studytype_specdom`
--

INSERT INTO `faculty_studytype_specdom` (`Id_faculty`, `Id_studyType`, `Id_specialization`) VALUES
(41, 1, 8),
(41, 1, 9),
(41, 1, 10),
(41, 2, 11),
(41, 2, 12),
(41, 2, 13),
(41, 2, 14),
(41, 3, 8),
(41, 3, 26),
(42, 1, 15),
(42, 1, 16),
(42, 1, 17),
(42, 1, 18),
(42, 1, 19),
(42, 1, 20),
(42, 2, 27),
(42, 2, 28),
(42, 2, 29),
(42, 2, 30),
(42, 2, 31),
(42, 2, 32),
(42, 2, 33),
(42, 3, 34),
(45, 1, 21),
(45, 1, 22),
(45, 1, 23),
(45, 1, 24),
(45, 1, 25),
(45, 2, 35),
(45, 2, 36),
(45, 2, 37),
(45, 2, 38);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `Id_User` int(255) NOT NULL,
  `Id_Friend` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`Id_User`, `Id_Friend`) VALUES
(24, 35),
(35, 24);

-- --------------------------------------------------------

--
-- Table structure for table `master`
--

CREATE TABLE `master` (
  `Id_master` int(100) NOT NULL,
  `Name_master` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `msg_id` int(255) NOT NULL,
  `incoming_msg_id` int(255) NOT NULL,
  `outgoing_msg_id` int(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `months`
--

CREATE TABLE `months` (
  `Id_month` int(12) NOT NULL,
  `Name_month` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `months`
--

INSERT INTO `months` (`Id_month`, `Name_month`) VALUES
(1, 'jan'),
(2, 'feb'),
(3, 'mar'),
(4, 'apr'),
(5, 'may'),
(6, 'jun'),
(7, 'jul'),
(8, 'aug'),
(9, 'sep'),
(10, 'oct'),
(11, 'nov'),
(12, 'dec');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `Id_Photo` int(255) NOT NULL,
  `Name_photo` varchar(100) NOT NULL,
  `Path` varchar(100) NOT NULL,
  `Id_Person` int(100) NOT NULL,
  `Uploaded_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `Id_Post` int(255) NOT NULL,
  `Title_post` varchar(255) NOT NULL,
  `Id_Person` int(100) NOT NULL,
  `Content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `Uploaded_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `Id_School` int(100) NOT NULL,
  `Id_City` int(100) NOT NULL,
  `Name_school` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `school`
--

INSERT INTO `school` (`Id_School`, `Id_City`, `Name_school`) VALUES
(1, 8, 'Liceul Teoretic \"Mihai Eminescu\"'),
(2, 9, 'GIMNAZIUL \"MIHAI EMINESCU\"');

-- --------------------------------------------------------

--
-- Table structure for table `schoolchild`
--

CREATE TABLE `schoolchild` (
  `Id_Scholchild` int(100) NOT NULL,
  `Id_User` int(100) NOT NULL,
  `Id_Country` int(100) NOT NULL,
  `Id_cityVillage` int(100) NOT NULL,
  `Id_School` int(100) NOT NULL,
  `School_year` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `specialization`
--

CREATE TABLE `specialization` (
  `Id_Specialization` int(100) NOT NULL,
  `Name_Specialization` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `specialization`
--

INSERT INTO `specialization` (`Id_Specialization`, `Name_Specialization`) VALUES
(1, 'Administrarea Afacerilor'),
(2, 'Drept'),
(3, 'Fizică'),
(4, 'Sociologie'),
(5, 'Științele Educației'),
(6, 'Stiinte Politice'),
(7, 'Relații internaționale și studii europene'),
(8, 'Istorie'),
(9, 'Limba şi literatura română- Limba şi literatura engleză'),
(10, 'Traducere şi interpretare'),
(11, 'Identităţi regionale în Europa central-răsăriteană'),
(12, 'Cercetarea, conservarea şi valorificarea patrimoniului istoric'),
(13, 'Literatură şi cultură românească în context european'),
(14, 'Limbă, literatură şi cultură engleză în context european'),
(15, 'Economia comerţului, turismului şi serviciilor'),
(16, 'Administrarea afacerilor'),
(17, 'Administrarea afacerilor (în limba engleză)'),
(18, 'Finanţe şi bănci'),
(19, 'Contabilitate şi informatică de gestiune'),
(20, 'Marketing'),
(21, 'INFORMATICĂ'),
(22, 'ELECTRONICĂ APLICATĂ'),
(23, 'MĂSURĂTORI TERESTRE ŞI CADASTRU'),
(24, 'INGINERIA MEDIULUI'),
(25, 'INGINERIE URBANĂ şi DEZVOLTARE REGIONALĂ'),
(26, 'Filologie'),
(27, 'Auditul şi controlul agenţilor economici'),
(28, 'Sistemul informational contabil în asistarea deciziilor manageriale'),
(29, 'Bănci, asigurări şi pieţe financiare'),
(30, 'Fiscalitate şi management financiar'),
(31, 'Administrarea afacerilor în comert, turism şi servicii'),
(32, 'Administrarea dezvoltării regionale durabile'),
(33, 'Marketing şi promovarea vânzărilor'),
(34, 'Contabilitate'),
(35, 'PROGRAMARE AVANSATĂ SI BAZE DE DATE'),
(36, 'SISTEME ELECTRONICE INTELIGENTE AVANSATE'),
(37, 'EVALUAREA, MONITORIZAREA ŞI AUDITUL MEDIULUI'),
(38, 'SISTEME INFORMŢIONALE CADASTRALE ŞI MANAGEMENT IMOBILIAR');

-- --------------------------------------------------------

--
-- Table structure for table `specialization_yearsofstudying`
--

CREATE TABLE `specialization_yearsofstudying` (
  `Id_Specialization` int(100) NOT NULL,
  `typeOfStudy` int(3) NOT NULL,
  `Years_of_studying` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `specialization_yearsofstudying`
--

INSERT INTO `specialization_yearsofstudying` (`Id_Specialization`, `typeOfStudy`, `Years_of_studying`) VALUES
(8, 1, 3),
(9, 1, 3),
(10, 1, 3),
(11, 2, 2),
(12, 2, 2),
(13, 2, 2),
(14, 2, 2),
(8, 3, 3),
(26, 3, 3),
(15, 1, 3),
(16, 1, 3),
(17, 1, 3),
(18, 1, 3),
(19, 1, 3),
(20, 1, 3),
(27, 2, 2),
(28, 2, 2),
(29, 2, 2),
(30, 2, 2),
(31, 2, 2),
(32, 2, 2),
(33, 2, 2),
(34, 3, 1),
(21, 1, 3),
(22, 1, 4),
(23, 1, 4),
(24, 1, 4),
(25, 1, 4),
(35, 2, 2),
(38, 2, 2),
(36, 2, 2),
(37, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `Id_Student` int(10) NOT NULL,
  `Id_User` int(10) NOT NULL,
  `Id_Country` int(10) NOT NULL,
  `Id_City` int(10) NOT NULL,
  `Id_University` int(10) NOT NULL,
  `Id_Faculty` int(10) NOT NULL,
  `Id_TypeOfStudy` int(100) NOT NULL,
  `Id_Specialization` int(10) NOT NULL,
  `Year_of_studying` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`Id_Student`, `Id_User`, `Id_Country`, `Id_City`, `Id_University`, `Id_Faculty`, `Id_TypeOfStudy`, `Id_Specialization`, `Year_of_studying`) VALUES
(17, 24, 1, 4, 4, 45, 1, 21, 2),
(27, 35, 1, 4, 4, 45, 1, 21, 2);

-- --------------------------------------------------------

--
-- Table structure for table `typeofstudy`
--

CREATE TABLE `typeofstudy` (
  `Id_Type` int(1) NOT NULL,
  `Type_of_study` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `typeofstudy`
--

INSERT INTO `typeofstudy` (`Id_Type`, `Type_of_study`) VALUES
(1, 'license'),
(2, 'master'),
(3, 'doctorate');

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

CREATE TABLE `university` (
  `Id_University` int(100) NOT NULL,
  `Id_City` int(100) NOT NULL,
  `Name_University` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `university`
--

INSERT INTO `university` (`Id_University`, `Id_City`, `Name_University`) VALUES
(1, 1, 'Universitatea din București'),
(2, 2, 'Universitatea ”Alexandru Ioan Cuza”'),
(3, 3, 'Universitatea ”Babeș-Bolyai”'),
(4, 4, 'Universitatea ”1 Decembrie 1918”'),
(5, 6, 'Universitatea Tehnică din Moldova'),
(6, 7, 'Universitatea de Stat „Alecu Russo”'),
(7, 4, 'Universitatea Politehnica');

-- --------------------------------------------------------

--
-- Table structure for table `university_faculty`
--

CREATE TABLE `university_faculty` (
  `Id_university` int(100) NOT NULL,
  `Id_faculty` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `university_faculty`
--

INSERT INTO `university_faculty` (`Id_university`, `Id_faculty`) VALUES
(4, 41),
(4, 42),
(4, 43),
(4, 44),
(4, 45),
(7, 43),
(7, 44),
(7, 45),
(7, 42);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(255) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Surname` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Date_birth` date NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Entered_date` date NOT NULL,
  `Country` int(100) NOT NULL,
  `City` int(100) NOT NULL,
  `Avatar_Path` varchar(10000) DEFAULT NULL,
  `Active` tinyint(1) NOT NULL,
  `Status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Name`, `Surname`, `Email`, `Password`, `Date_birth`, `Gender`, `Entered_date`, `Country`, `City`, `Avatar_Path`, `Active`, `Status`) VALUES
(24, 'Augustin', 'Cojocaru', 'cojocaru498@gmail.com', '$2y$10$lhCumj2UJnWJOt1gC68pDOhHr1D41gq88NpHYkwQv9QmTLAyUSG6W', '1999-08-14', 'male', '2021-05-21', 2, 7, '7dfb4cf67742cb0660305e56ef816c53fcec892cae7f6ee39b75f34e659d672c/cc41c1bd33f02ba4fa311cbf2536ad6c13bfb72a995e739e77148645b5b914681d96fec073f92a65c1e169fc309d5cb2/ca5acc0f1dfb7a1e3573683f1a460bc688d1218f245d3014d446dca477c94472ab32b323bcd80196ea8a5f4b32b10b1913c928dc77344ed71956b87668eeca1d/vladimir-lenin-medium.jpg', 1, 'Online'),
(35, 'Pavel', 'Gorodetchi', 'pavel.gorodetchi@gmail.com', '$2y$10$WD0CSCVMCKpMPiZdg/VjQ.0tVq6/9UeGhYNaN3fSnj4NlF87OAnYK', '1963-09-15', 'male', '2021-06-02', 1, 4, '7dfb4cf67742cb0660305e56ef816c53fcec892cae7f6ee39b75f34e659d672c/405a96f8ec7dc116b6e17eaea37f0ab5967715fa04ea785a124cb876befc079a38898b024782160f725c03427c957b64/ca5acc0f1dfb7a1e3573683f1a460bc688d1218f245d3014d446dca477c94472ab32b323bcd80196ea8a5f4b32b10b1913c928dc77344ed71956b87668eeca1d/5f3a48bf7c39f.png', 1, 'Online');

-- --------------------------------------------------------

--
-- Table structure for table `user_notifications`
--

CREATE TABLE `user_notifications` (
  `Id_notification` int(255) NOT NULL,
  `Id_user` int(255) NOT NULL,
  `notification_subject` varchar(10000) NOT NULL,
  `from_user` int(255) NOT NULL,
  `notification_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `Id_video` int(255) NOT NULL,
  `Name_video` varchar(100) NOT NULL,
  `Path` varchar(100) NOT NULL,
  `Id_Person` int(100) NOT NULL,
  `Uploaded_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `village`
--

CREATE TABLE `village` (
  `Id_Village` int(100) NOT NULL,
  `Id_country` int(100) NOT NULL,
  `Name_village` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`Id_City`),
  ADD KEY `country_foreignkey` (`Id_Country`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`Id_Country`);

--
-- Indexes for table `country_city`
--
ALTER TABLE `country_city`
  ADD KEY `councty_c_constraint_fk` (`Id_country`),
  ADD KEY `city_c_constraint_fk` (`Id_city`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`Id_Faculty`);

--
-- Indexes for table `faculty_studytype_specdom`
--
ALTER TABLE `faculty_studytype_specdom`
  ADD KEY `faculty_ss_constraint_fk` (`Id_faculty`),
  ADD KEY `studyType_fs_constraint_fk` (`Id_studyType`),
  ADD KEY `specDom_fs_constraint_fk` (`Id_specialization`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD KEY `id_user_n_constraint_fk` (`Id_User`),
  ADD KEY `id_friend_n_constraint_fk` (`Id_Friend`);

--
-- Indexes for table `master`
--
ALTER TABLE `master`
  ADD PRIMARY KEY (`Id_master`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`msg_id`),
  ADD KEY `in_user_constraint_fk` (`incoming_msg_id`),
  ADD KEY `out_user_constraint_fk` (`outgoing_msg_id`);

--
-- Indexes for table `months`
--
ALTER TABLE `months`
  ADD PRIMARY KEY (`Id_month`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`Id_Photo`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`Id_Post`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`Id_School`),
  ADD KEY `City_sch_constraint_fk` (`Id_City`);

--
-- Indexes for table `schoolchild`
--
ALTER TABLE `schoolchild`
  ADD PRIMARY KEY (`Id_Scholchild`),
  ADD KEY `sch_user_constraint_fk` (`Id_User`),
  ADD KEY `sch_country_constraint_fk` (`Id_Country`),
  ADD KEY `sch_cityVill_constraint_fk` (`Id_cityVillage`),
  ADD KEY `sch_school_constraint_fk` (`Id_School`);

--
-- Indexes for table `specialization`
--
ALTER TABLE `specialization`
  ADD PRIMARY KEY (`Id_Specialization`);

--
-- Indexes for table `specialization_yearsofstudying`
--
ALTER TABLE `specialization_yearsofstudying`
  ADD KEY `specialization_y_constaint_fk` (`Id_Specialization`),
  ADD KEY `typeOfStudy_y_constraint_fk` (`typeOfStudy`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Id_Student`),
  ADD KEY `typeOfStudy_std_constraint_fk` (`Id_TypeOfStudy`),
  ADD KEY `user_std_constraint_fk` (`Id_User`),
  ADD KEY `country_std_constraint_fk` (`Id_Country`),
  ADD KEY `city_std_constraint_fk` (`Id_City`),
  ADD KEY `university_std_constraint_fk` (`Id_University`),
  ADD KEY `faculty_std_constraint_fk` (`Id_Faculty`),
  ADD KEY `specializaton_std_constraint_fk` (`Id_Specialization`);

--
-- Indexes for table `typeofstudy`
--
ALTER TABLE `typeofstudy`
  ADD PRIMARY KEY (`Id_Type`);

--
-- Indexes for table `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`Id_University`),
  ADD KEY `city_constraint_fk` (`Id_City`);

--
-- Indexes for table `university_faculty`
--
ALTER TABLE `university_faculty`
  ADD KEY `university_constraint_fk` (`Id_university`),
  ADD KEY `faculty_constraint_fk` (`Id_faculty`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `city_u_constraint_fk` (`City`),
  ADD KEY `country_u_constraint_fk` (`Country`);

--
-- Indexes for table `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD PRIMARY KEY (`Id_notification`),
  ADD KEY `user_n_constraint_fk` (`Id_user`),
  ADD KEY `from_user_n_constraint_fk` (`from_user`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`Id_video`);

--
-- Indexes for table `village`
--
ALTER TABLE `village`
  ADD PRIMARY KEY (`Id_Village`),
  ADD KEY `vill_country_constraint_fk` (`Id_country`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `Id_City` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `Id_Country` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `Id_Faculty` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `master`
--
ALTER TABLE `master`
  MODIFY `Id_master` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `msg_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `months`
--
ALTER TABLE `months`
  MODIFY `Id_month` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `Id_Photo` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `Id_Post` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `Id_School` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `schoolchild`
--
ALTER TABLE `schoolchild`
  MODIFY `Id_Scholchild` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `specialization`
--
ALTER TABLE `specialization`
  MODIFY `Id_Specialization` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `Id_Student` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `typeofstudy`
--
ALTER TABLE `typeofstudy`
  MODIFY `Id_Type` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `university`
--
ALTER TABLE `university`
  MODIFY `Id_University` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `user_notifications`
--
ALTER TABLE `user_notifications`
  MODIFY `Id_notification` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `Id_video` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `village`
--
ALTER TABLE `village`
  MODIFY `Id_Village` int(100) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `country_foreignkey` FOREIGN KEY (`Id_Country`) REFERENCES `country` (`Id_Country`);

--
-- Constraints for table `country_city`
--
ALTER TABLE `country_city`
  ADD CONSTRAINT `city_c_constraint_fk` FOREIGN KEY (`Id_city`) REFERENCES `city` (`Id_City`),
  ADD CONSTRAINT `councty_c_constraint_fk` FOREIGN KEY (`Id_country`) REFERENCES `country` (`Id_Country`);

--
-- Constraints for table `faculty_studytype_specdom`
--
ALTER TABLE `faculty_studytype_specdom`
  ADD CONSTRAINT `faculty_ss_constraint_fk` FOREIGN KEY (`Id_faculty`) REFERENCES `faculty` (`Id_Faculty`),
  ADD CONSTRAINT `specDom_fs_constraint_fk` FOREIGN KEY (`Id_specialization`) REFERENCES `specialization` (`Id_Specialization`),
  ADD CONSTRAINT `studyType_fs_constraint_fk` FOREIGN KEY (`Id_studyType`) REFERENCES `typeofstudy` (`Id_Type`);

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `id_friend_n_constraint_fk` FOREIGN KEY (`Id_Friend`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `id_user_n_constraint_fk` FOREIGN KEY (`Id_User`) REFERENCES `user` (`ID`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `in_user_constraint_fk` FOREIGN KEY (`incoming_msg_id`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `out_user_constraint_fk` FOREIGN KEY (`outgoing_msg_id`) REFERENCES `user` (`ID`);

--
-- Constraints for table `school`
--
ALTER TABLE `school`
  ADD CONSTRAINT `City_sch_constraint_fk` FOREIGN KEY (`Id_City`) REFERENCES `city` (`Id_City`);

--
-- Constraints for table `schoolchild`
--
ALTER TABLE `schoolchild`
  ADD CONSTRAINT `sch_cityVill_constraint_fk` FOREIGN KEY (`Id_cityVillage`) REFERENCES `city` (`Id_City`),
  ADD CONSTRAINT `sch_country_constraint_fk` FOREIGN KEY (`Id_Country`) REFERENCES `country` (`Id_Country`),
  ADD CONSTRAINT `sch_school_constraint_fk` FOREIGN KEY (`Id_School`) REFERENCES `school` (`Id_School`),
  ADD CONSTRAINT `sch_user_constraint_fk` FOREIGN KEY (`Id_User`) REFERENCES `user` (`ID`);

--
-- Constraints for table `specialization_yearsofstudying`
--
ALTER TABLE `specialization_yearsofstudying`
  ADD CONSTRAINT `specialization_y_constaint_fk` FOREIGN KEY (`Id_Specialization`) REFERENCES `specialization` (`Id_Specialization`),
  ADD CONSTRAINT `typeOfStudy_y_constraint_fk` FOREIGN KEY (`typeOfStudy`) REFERENCES `typeofstudy` (`Id_Type`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `city_std_constraint_fk` FOREIGN KEY (`Id_City`) REFERENCES `city` (`Id_City`),
  ADD CONSTRAINT `country_std_constraint_fk` FOREIGN KEY (`Id_Country`) REFERENCES `country` (`Id_Country`),
  ADD CONSTRAINT `faculty_std_constraint_fk` FOREIGN KEY (`Id_Faculty`) REFERENCES `faculty` (`Id_Faculty`),
  ADD CONSTRAINT `specializaton_std_constraint_fk` FOREIGN KEY (`Id_Specialization`) REFERENCES `specialization` (`Id_Specialization`),
  ADD CONSTRAINT `typeOfStudy_std_constraint_fk` FOREIGN KEY (`Id_TypeOfStudy`) REFERENCES `typeofstudy` (`Id_Type`),
  ADD CONSTRAINT `university_std_constraint_fk` FOREIGN KEY (`Id_University`) REFERENCES `university` (`Id_University`),
  ADD CONSTRAINT `user_std_constraint_fk` FOREIGN KEY (`Id_User`) REFERENCES `user` (`ID`);

--
-- Constraints for table `university`
--
ALTER TABLE `university`
  ADD CONSTRAINT `city_constraint_fk` FOREIGN KEY (`Id_City`) REFERENCES `city` (`Id_City`);

--
-- Constraints for table `university_faculty`
--
ALTER TABLE `university_faculty`
  ADD CONSTRAINT `faculty_constraint_fk` FOREIGN KEY (`Id_faculty`) REFERENCES `faculty` (`Id_Faculty`),
  ADD CONSTRAINT `university_constraint_fk` FOREIGN KEY (`Id_university`) REFERENCES `university` (`Id_University`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `city_u_constraint_fk` FOREIGN KEY (`City`) REFERENCES `city` (`Id_City`),
  ADD CONSTRAINT `country_u_constraint_fk` FOREIGN KEY (`Country`) REFERENCES `country` (`Id_Country`);

--
-- Constraints for table `user_notifications`
--
ALTER TABLE `user_notifications`
  ADD CONSTRAINT `from_user_n_constraint_fk` FOREIGN KEY (`from_user`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_n_constraint_fk` FOREIGN KEY (`Id_user`) REFERENCES `user` (`ID`);

--
-- Constraints for table `village`
--
ALTER TABLE `village`
  ADD CONSTRAINT `vill_country_constraint_fk` FOREIGN KEY (`Id_country`) REFERENCES `country` (`Id_Country`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
