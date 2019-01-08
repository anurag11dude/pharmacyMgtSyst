-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2019 at 08:44 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pricepoint`
--

-- --------------------------------------------------------

--
-- Table structure for table `customerinvoice`
--

CREATE TABLE IF NOT EXISTS `customerinvoice` (
  `id` int(11) NOT NULL,
  `customer` text NOT NULL,
  `date` text NOT NULL,
  `invno` text NOT NULL,
  `totalamt` int(11) NOT NULL,
  `totalpaid` int(11) NOT NULL,
  `outbalance` int(11) NOT NULL,
  `category` text NOT NULL,
  `salesref` text NOT NULL,
  `paymeth` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customerinvoice`
--

INSERT INTO `customerinvoice` (`id`, `customer`, `date`, `invno`, `totalamt`, `totalpaid`, `outbalance`, `category`, `salesref`, `paymeth`) VALUES
(1, 'NEW CHANCE PHARMACY', '2018-11-26', 'PP00001', 263780, 260000, 3780, 'customer', 'webplay', 'cash'),
(2, 'NEW CHANCE PHARMACY', '2018-11-26', 'PP00002', 8800, 0, 12580, 'customer', 'webplay', 'Credit');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL,
  `customer_name` text NOT NULL,
  `customer_email` text NOT NULL,
  `customer_phone` text NOT NULL,
  `address` text NOT NULL,
  `account_created_on` text NOT NULL,
  `last_visit` text NOT NULL,
  `visit_count` int(11) NOT NULL,
  `outstanding_balance` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `customer_name`, `customer_email`, `customer_phone`, `address`, `account_created_on`, `last_visit`, `visit_count`, `outstanding_balance`) VALUES
(1, 'NEW CHANCE PHARMACY', '', '08073223001', 'LAGOS-UGBOWO EXPRESS ROAD, BENIN CITY', '2018-11-26', '2018-11-26', 2, 12580),
(2, 'WELLCITI PHARMACY', '', '07063564285', '', '2018-11-01', '0000-00-00', 0, 0),
(3, 'SAVYMEDICS PHARMACY', '', '08065195409', 'DUMEZ ROAD, BENIN CITY', '2018-10-30', '0000-00-00', 0, 0),
(4, 'CAROMEL PHARMACY', '', '', '', '2018-11-07', '0000-00-00', 0, 0),
(5, 'FLORA PHARMACY', '', '', '', '2018-09-10', '0000-00-00', 0, 0),
(6, 'MEDCARE PHARMACY', '', '', '', '2018-10-27', '0000-00-00', 0, 0),
(7, 'JULIA AND SLY PHARMACY', '', '', '', '2018-11-05', '0000-00-00', 0, 0),
(8, 'GLOSTIN CARE PHARMACY', '', '07037830467', '', '2018-11-08', '0000-00-00', 0, 0),
(9, 'TOP RANK PHARMACY', '', '08035433587', 'AIRPORT ROAD, BENIN CITY.', '2018-11-13', '0000-00-00', 0, 0),
(10, 'LARY-GEO PHARMACY', '', '', '', '2018-11-13', '0000-00-00', 0, 0),
(11, 'JAYBISCO PHARMACY', '', '08073775154', '', '2018-11-09', '0000-00-00', 0, 0),
(12, 'MANKIND PHARMACY', '', '', '', '2018-10-29', '0000-00-00', 0, 0),
(13, 'OSARUGUE PHARMACY', '', '', '', '2018-10-27', '0000-00-00', 0, 0),
(14, 'GOD''S CARE PHARMACY', '', '', '', '2018-09-14', '0000-00-00', 0, 0),
(15, 'V.J ESSEX PHARMACY', '', '', '', '2018-11-07', '0000-00-00', 0, 0),
(16, 'EKESON PHARMACY', '', '07034662668', '', '2018-11-03', '0000-00-00', 0, 0),
(17, 'BEN AND BECKS PHARMACY', '', '', '', '2018-11-09', '0000-00-00', 0, 0),
(18, 'ROYAL OKHAI PHARMACY', '', '', '', '2018-11-07', '0000-00-00', 0, 0),
(19, 'AL-KINDY PHARMACY', '', '', '', '2018-09-15', '0000-00-00', 0, 0),
(20, 'VOAN PHARMACY', '', '', '', '2018-10-25', '0000-00-00', 0, 0),
(21, 'PRICEPOINT PHARMACY, LAGOS.', '', '08028259467', '28, EKORO RD, ABULEGBA, LAGOS.', '2018-10-15', '0000-00-00', 0, 0),
(22, '', '', '', '', '', '0000-00-00', 0, 0),
(23, 'RAYZER HEALTHCARE LTD', '', '', '', '2018-09-20', '0000-00-00', 0, 0),
(24, 'REALCARE PHARMACY LTD', '', '', '', '2018-10-19', '0000-00-00', 0, 0),
(25, 'EL ARUKAH PHARMACY', '', '08066230510', 'EKENWAN ROAD, BENIN CITY.', '2018-11-13', '0000-00-00', 0, 0),
(26, 'SUNKEST PHARMACY', '', '08067812440', '70B, FIRST EAST CIRCULAR ROAD BENIN CITY', '2018-09-21', '0000-00-00', 0, 0),
(27, 'LEORA PHARMACY', '', '08135663115', '61, 2ND UGBOR ROAD, GRA, BENIN CITY', '2018-11-09', '0000-00-00', 0, 0),
(28, 'CASHICS PHARMACY', '', '08061645623', 'AIRPORT ROAD, BENIN CITY.', '2018-11-09', '0000-00-00', 0, 0),
(29, 'MONIC TEE PHARMACY', '', '08035746039', 'LAGOS UGBOWO EXPRESS ROAD,\n\nBENIN CITY.', '2018-09-21', '0000-00-00', 0, 0),
(30, 'CHLOE PHARMACY', '', '', '', '2018-09-25', '0000-00-00', 0, 0),
(31, 'OGINES PHARMACY', '', '', '', '2018-10-11', '0000-00-00', 0, 0),
(32, 'O.C. T  PHARMACY', '', '', '', '2018-09-26', '0000-00-00', 0, 0),
(33, 'C.C CHUKS  PHARMACY', '', '', '', '2018-11-03', '0000-00-00', 0, 0),
(34, 'DUTY FREE PHARMACY', '', '08141955946', '', '2018-11-07', '0000-00-00', 0, 0),
(35, 'METTRICARE PHARMACY', '', '', '', '2018-11-08', '0000-00-00', 0, 0),
(36, 'FRANSEK PHARMACY', '', '08060983073', '', '2018-11-02', '0000-00-00', 0, 0),
(37, 'D L G PHARMACY', '', '', '', '2018-11-09', '0000-00-00', 0, 0),
(38, 'SARKOM PHARMACY', '', '', '', '2018-11-02', '0000-00-00', 0, 0),
(39, 'ELEORA PHARMACY', '', '', '', '2018-09-28', '0000-00-00', 0, 0),
(40, 'RAPHAMEDICS PHARMACY', '', '', '', '2018-11-06', '0000-00-00', 0, 0),
(41, 'EHISBASS PHARMACY', '', '08034636170', 'ELORA HOTEL, SAPELE RD, BENIN CITY.', '2018-10-11', '0000-00-00', 0, 0),
(42, 'VJ ESSSEX PHARMACY', '', '07038885583', 'EKENWAN ROAD, BENIN CITY', '2018-10-11', '0000-00-00', 0, 0),
(43, 'LORIN PHARMACY', '', '', '', '2018-11-05', '0000-00-00', 0, 0),
(44, 'MASS ELDO PHARMACY', '', '', '', '2018-09-28', '0000-00-00', 0, 0),
(45, 'NSIBROS PHARMACY', '', '08038606523', '', '2018-11-10', '0000-00-00', 0, 0),
(46, 'EL-ARUKAH PHARMACY', '', '', '', '2018-10-02', '0000-00-00', 0, 0),
(47, 'KORBAN PHARMACY', '', '', '', '2018-11-07', '0000-00-00', 0, 0),
(48, 'SABICARE PHARMACY', '', '08037771541', 'AIRPORT ROAD, BENIN CITY', '2018-11-07', '0000-00-00', 0, 0),
(49, 'NURSE ANITA', '', '08060916670', '', '2018-11-13', '0000-00-00', 0, 0),
(50, 'KADA PLAZA PHARMACY', '', '08134395444', 'SAPELE ROAD, BENIN CITY,', '2018-10-06', '0000-00-00', 0, 0),
(51, 'VOSMIK PHARMACY', '', '', '', '2018-11-05', '0000-00-00', 0, 0),
(52, 'DREAMLIFE PHARMACY', '', '', '', '2018-10-06', '0000-00-00', 0, 0),
(53, 'EBI PHARMACY', '', '', '', '2018-10-06', '0000-00-00', 0, 0),
(54, 'PRESTIGE PHARMACY', '', '08156817128', 'REUBEN AGHO, GRA, B/CITY.', '2018-10-17', '0000-00-00', 0, 0),
(55, 'SAP NEPTAL PHARMACY', '', '', '', '2018-11-09', '0000-00-00', 0, 0),
(56, 'AZURE PHARMACY', '', '', 'OFF NEW BENIN', '2018-11-13', '0000-00-00', 0, 0),
(57, 'WORTHWELL PHARMACY', '', '', 'SAKPONBA RD', '2018-11-07', '0000-00-00', 0, 0),
(58, 'BLUE BAY PHARMACY', '', '', '', '2018-11-10', '0000-00-00', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE IF NOT EXISTS `invoice` (
  `id` int(11) NOT NULL,
  `inv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `inv`) VALUES
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `product_name` text NOT NULL,
  `product_description` text NOT NULL,
  `stock` int(11) NOT NULL,
  `product_retailprice` int(11) NOT NULL,
  `product_wholesaleprice` int(11) NOT NULL,
  `expiry_date` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_description`, `stock`, `product_retailprice`, `product_wholesaleprice`, `expiry_date`) VALUES
(1, 'EMZOR paracetamol Tab By 96', 'Paracetamol Tablet 500mg', 0, 250, 238, '0000-00-00'),
(2, 'AMPICLOX Caps Beecham 500mg', 'AMPICILLIN 250mg/CLOXACILLIN 250mg Caps', 47, 6500, 5995, '2018-12-29'),
(3, 'Augumentin Tab 625mg', 'Amoxycillin 500mg/Clavulanate 125mg Tab', 0, 2800, 2685, '0000-00-00'),
(4, 'Ciprotab Tab 500mg By 10', 'Ciprofloxacin 500mg Tablet', 10, 1000, 880, '2018-12-20'),
(5, 'Talen Tab 1.5mg', 'Bromazepam Tablet 1.5mg', 0, 600, 420, '0000-00-00'),
(6, 'TALEN 3mg', 'Bromazepam 3mg', 0, 800, 630, '0000-00-00'),
(7, 'AUGUMENTIN TAB 1g', 'Amoxycillin 875mg/Clavulanic acid 125mg', 0, 3200, 3065, '0000-00-00'),
(8, 'AUGUMENTIN TAB 375mg', 'Amoxycillin 250mg/Clavulanic Acid 125mg', 0, 2300, 2105, '0000-00-00'),
(9, 'AUGUMENTIN SYRUP 228', 'Amoxycillin 200mg/Clavulanic Acid 28.5mg', 0, 1700, 1580, '0000-00-00'),
(10, 'AUGUMENTIN ES SYRUP', 'Amoxycillin Trihydrate/Potassium Clavulanate', 0, 3200, 2900, '0000-00-00'),
(11, 'AMOXIL CAPS 500mg 10 x 10', 'Amoxycillin 500mg Caps', 0, 5000, 4035, '0000-00-00'),
(12, 'AMOXIL CAPS 250mg 10 x10', 'Amoxycillin 250mg Caps', 0, 2000, 1805, '0000-00-00'),
(13, 'AMOXIL SYRUP 125mg/5ml', 'Amoxycillin 125mg/5ml', 0, 700, 625, '0000-00-00'),
(14, 'AMPICLOX SYRUP 250mg/5ml', 'Ampicillin 125mg/Cloxacillin 125mg', 0, 1200, 1065, '0000-00-00'),
(15, 'AMPICLOX DROP 90mg/0.6ml', 'Ampicillin 60mg/Cloxacillin 30mg', 0, 800, 625, '0000-00-00'),
(16, 'ZINNAT TAB 500mg', 'Cefuroxime Tab 500mg', 0, 3000, 2765, '0000-00-00'),
(17, 'ZINNAT TAB 250mg', 'Cefuroxime Tab 250mg', 0, 2300, 1940, '0000-00-00'),
(18, 'ZINNAT SYRUP 50ml', 'Cefuroxime 125mg/5ml', 0, 2700, 2180, '0000-00-00'),
(19, 'VENTOLIN INHALER', 'Salbutamol 100micrograms', 0, 1000, 1150, '0000-00-00'),
(20, 'FORTUM Inj 1g', 'Ceftazidime 1g', 0, 2500, 2330, '0000-00-00'),
(21, 'Ciprotab Tab by 14', 'Ciprofloxacin 500mg Tab', 0, 1250, 1140, '0000-00-00'),
(22, 'ASTYMIN SYRUP 200ml', 'Multivitamins/Amino acids Syrup', 0, 1150, 1080, '0000-00-00'),
(23, 'ASTYMIN CAPS 2 X 10', 'Mutivitamins/Amino acids', 0, 1200, 1080, '0000-00-00'),
(24, 'ASTYFER SYRUP 200ml', 'Multivitamins/Amino acids/Iron', 0, 1200, 1080, '0000-00-00'),
(25, 'ASTYFER CAPS 2 X 15', 'Multivitamins/Amino acids/Iron', 0, 1200, 1080, '0000-00-00'),
(26, 'TRIBOTAN BABY CREAM', 'Baby Cream 20g', 0, 450, 395, '0000-00-00'),
(27, 'SWIDAR TAB', 'Sulfadoxine 500mg/Pyrimethamin 25mg', 0, 250, 198, '0000-00-00'),
(28, 'CLABETIC TAB', 'Glibenclamide 5mg/Metformin 500mg', 0, 700, 630, '0000-00-00'),
(29, 'TINIFLOX TAB x10', 'Ofloxacin 200mg/Tinidazole 600mg', 0, 800, 550, '0000-00-00'),
(30, 'TINIFLOX TAB X20', 'Ofloxacin 200mg/Tinidazole 600mg', 0, 1500, 990, '0000-00-00'),
(31, 'UNIVAL TAB 5mg 2 x 6', 'Diazepam 5mg', 0, 400, 315, '0000-00-00'),
(32, 'UNIVAL TAB 5mg 16 x 6', 'Diazepam 5mg', 0, 2400, 1890, '0000-00-00'),
(33, 'EMZOR Paracetamol Syrup 60ml', 'Paracetamol Syr 125mg/5ml', 0, 200, 108, '0000-00-00'),
(34, 'Em-Vit-C SYRUP 100ml', 'Vitamin C Syrup', 0, 200, 154, '0000-00-00'),
(35, 'EMVITE SYRUP 100ml', 'Multivitamin Syrup', 0, 250, 161, '0000-00-00'),
(36, 'EMZOLYN CHILD', 'Cough Syrup', 0, 180, 156, '0000-00-00'),
(37, 'EMZOLYN ADULT', 'Cough Syrup', 0, 190, 169, '0000-00-00'),
(38, 'EMMOX SUSPENSION', 'Amoxicillin 125mg/5ml', 0, 230, 206, '0000-00-00'),
(39, 'EMZOCLOX SUSPENSION', 'Ampicillin 125mg/Cloxacillin 125mg', 0, 280, 259, '0000-00-00'),
(40, 'ZOLAT SUSPENSION', 'Albendazole 200mg Susp.', 0, 150, 105, '0000-00-00'),
(41, 'MALDOX TAB 1 x 3', 'Sulfadoxine 500mg/Pyrimethamine 25mg', 0, 100, 90, '0000-00-00'),
(42, 'EM-VIT-C TAB (W) BY 1000', 'Vitamin C Tab (W) BY 1000', 0, 780, 725, '0000-00-00'),
(43, 'Em-Vit-C TAB (C) BY 1000', 'Vitamin C Tab (C) BY 1000', 0, 800, 755, '0000-00-00'),
(44, 'Em-Vit-C TAB (W) BY 100', 'Vutamin C Tab (W) BY 100', 0, 250, 175, '0000-00-00'),
(45, 'Em-Vit-C TAB (C) BY 100', 'Vitamin C Tab (C) BY 100', 0, 250, 205, '0000-00-00'),
(46, 'EMTRIM TAB (Blister) 10 X 100', 'Co-Trimoxazole 480mg', 0, 4450, 4380, '0000-00-00'),
(47, 'EMTRIM SYRUP 50ml', 'Co-Trimoxazole Susp 240mg/5ml', 0, 200, 145, '0000-00-00'),
(48, 'EMCAP SUSPENSION 100ml', 'Paracetamol Susp 125mg/5ml', 0, 200, 135, '0000-00-00'),
(49, 'Em-B-Plex SYRUP 100ml', 'Vitamin B-Complex Syr', 0, 200, 140, '0000-00-00'),
(50, 'Folic Acid Tab BY 100', 'Folic Acid Tab 5mg', 0, 200, 130, '0000-00-00'),
(51, 'AUGUMENTIN SYRUP 457mg/5ml', 'Amoxycillin 400mg/Clavulanate 57mg', 0, 2700, 2480, '0000-00-00'),
(52, 'ACCU-CHEK ACTIVE KIT', 'MACHINE (KIT)\n\nmg/dl', 0, 6500, 7000, '0000-00-00'),
(53, 'ACCU-CHEK ACTIVE', '50 STRIPS', 0, 4500, 4100, '0000-00-00'),
(54, 'OMRON M2', 'BP MONITOR (M2)', 0, 15000, 13500, '0000-00-00'),
(55, 'OMRON M3', 'BP MONITOR (M3)', 0, 21000, 19500, '0000-00-00'),
(56, 'OMRON M6', 'BP MONITOR (M6)', 0, 27000, 24500, '0000-00-00'),
(57, 'OMRON IQ142', 'BP MONITOR (IQ 142)', 0, 72000, 69000, '0000-00-00'),
(58, 'CIPROTAB TN X10', '', 0, 0, 1060, '0000-00-00'),
(59, 'AUGUMENTIN DROPS', 'Amoxicillin trihydrate-Potassium clavulanate', 0, 0, 740, '0000-00-00'),
(60, 'COARTEM TAB 80/480', '1 X 6Tab', 0, 1500, 1270, '0000-00-00'),
(61, 'COARTEM TAB 20/120', '4 X 6Tab', 0, 1200, 950, '0000-00-00'),
(62, 'COARTEM TAB 20/120 (3 X 6Tab)', '3 x 6Tab', 0, 1000, 690, '0000-00-00'),
(63, 'COARTEM TAB 20/120 (2 X 6Tab)', '2 x 6Tab', 0, 800, 590, '0000-00-00'),
(64, 'COARTEM TAB 20/120 (1 X 6Tab)', '1 x 6Tab', 0, 600, 480, '0000-00-00'),
(65, 'LONART DS TAB', '1 X 6Tab', 0, 1200, 880, '0000-00-00'),
(66, 'LONART 20/120 TAB', '4 X 6Tab', 0, 600, 330, '0000-00-00'),
(67, 'LONART 20/120 DISPERSIBLE TAB', '1 X 6Tab', 0, 300, 170, '0000-00-00'),
(68, 'LONART SYRUP', '60ml', 0, 1000, 680, '0000-00-00'),
(69, 'MYCOTEN CREAM', '20g Tube', 0, 300, 265, '0000-00-00'),
(70, 'MYCOTEN VAG. CREAM', '35g Tube', 0, 800, 530, '0000-00-00'),
(71, 'MYCOTEN VAG. TAB', '1 X 6Tab', 0, 800, 520, '0000-00-00'),
(72, 'BIOCOTEN CREAM', '20g Tube', 0, 400, 310, '0000-00-00'),
(73, 'NEUROGESIC OINTMENT S/S', '35g Tube', 0, 500, 385, '0000-00-00'),
(74, 'NEUROGESIC OINTMENT B/S', '85g Tube', 0, 800, 610, '0000-00-00'),
(75, 'ZINNAT INJECTION', '750mg Vial', 0, 4800, 4400, '0000-00-00'),
(76, 'MALDOX SUSPENSION 15ml', 'Sulfadoxine 500mg/Pyrimethamine 25mg (5ml)', 0, 200, 160, '0000-00-00'),
(77, 'EMGYL SYRUP 60ml', 'Metronidazole 200mg/5ml', 0, 200, 148, '0000-00-00'),
(78, 'ZOLAT CAPLET 200mg x 2.', 'Albendazole 200mg', 0, 100, 68, '0000-00-00'),
(79, 'Em-B-Plex Tablet x 100', 'Vitamin B-Complex Tablet', 0, 200, 90, '0000-00-00'),
(80, 'Em-B-Plex Tablet x 1000', 'Vitamin B-Complex', 0, 600, 480, '0000-00-00'),
(81, 'Em-Vit-C DROPS 15ml', 'Vitamin C Drops', 0, 200, 148, '0000-00-00'),
(82, 'EMZOR PARA 1000', 'Paracetamol 1000mg Caplet ', 0, 2300, 2200, '0000-00-00'),
(83, 'FOLIC ACID TABLET X 1000', 'Folic Acid Tablet 5mg', 0, 1000, 940, '0000-00-00'),
(84, 'EMZOR paracetamol Drops', 'Paracetamol 100mg/1ml', 0, 200, 135, '0000-00-00'),
(85, 'Chlorpheniramine Tab', '', 0, 0, 90, '0000-00-00'),
(86, 'EMCAP X 1000 CUP', 'Paracetamol Caplet x 1000 Cup', 0, 1900, 1765, '0000-00-00'),
(87, 'EMZOR PARACETAMOL TABLET X 1000 CUP', 'Paracetamol Tablet 500mg x 1000', 0, 1800, 1645, '0000-00-00'),
(88, 'EMTRISIL SUSPENSION', '', 0, 0, 361, '0000-00-00'),
(89, 'OMEGA-3 FISH OIL EMZOR', '3 X 10 Gelules (1000mg)', 0, 1300, 980, '0000-00-00'),
(90, 'FUNBACT-A CREAM', '30g Tube Cream', 0, 300, 265, '0000-00-00'),
(91, 'OMRON DIGITAL THERMOMETER', 'THERMOMETER', 0, 1000, 880, '0000-00-00'),
(92, 'OMRON DIGITAL WEIGHING SCALE', 'WEIGHING SCALE', 0, 8500, 7980, '0000-00-00'),
(93, 'OMRON M2 (BASIC)', 'BP MONITOR M2 BASIC', 0, 15000, 12500, '0000-00-00'),
(94, 'EMMOX 250mg DISPERSIBLE TABLET', 'AMOXICILLIN 250mg Dispersible Tablet', 0, 250, 185, '0000-00-00'),
(95, 'EMXIDINE GEL 25g', 'Chlorhexidine Gel 7.1%', 0, 300, 195, '0000-00-00'),
(96, 'HYDROCORTISONE CREAM 15g', 'Drugfield Hydrocortisone cream 15g', 0, 300, 270, '0000-00-00'),
(97, 'LOKMAL -QS TABLET', 'ARTHEMETER/LUMEFANTRINE 80/480', 0, 500, 445, '0000-00-00'),
(98, 'EMZOCLOX DROP', 'Ampicillin/Cloxacillin Oral drops 90mg/0.6mls', 0, 300, 215, '0000-00-00'),
(99, 'EMCAP CAPLET', 'Paracetamol Caplet 500mg (10 x 10)', 0, 350, 285, '0000-00-00'),
(100, 'LOKMAL SUSPENSION 60ml', 'Arthemeter/Lumefantrine (180/1080)', 0, 600, 445, '0000-00-00'),
(101, 'EMGYL TABLET X 1000', 'Metronidazole 200mg', 0, 2200, 1850, '0000-00-00'),
(102, 'CELLGEVITY', '', 0, 0, 6900, '0000-00-00'),
(103, 'CHLORPHENNIRAMINE MALEATE X1000', '', 0, 0, 335, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE IF NOT EXISTS `sales` (
  `id` int(11) NOT NULL,
  `invoiceno` text NOT NULL,
  `customer_name` text NOT NULL,
  `product` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `expirydate` date NOT NULL,
  `unitprice` int(11) NOT NULL,
  `totalprice` int(11) NOT NULL,
  `totalamt` int(11) NOT NULL,
  `paidamt` int(11) NOT NULL,
  `outbal` int(11) NOT NULL,
  `pricetype` text NOT NULL,
  `saleref` text NOT NULL,
  `salesdate` text NOT NULL,
  `paymethod` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `invoiceno`, `customer_name`, `product`, `quantity`, `expirydate`, `unitprice`, `totalprice`, `totalamt`, `paidamt`, `outbal`, `pricetype`, `saleref`, `salesdate`, `paymethod`) VALUES
(9, 'PP00002', 'NEW CHANCE PHARMACY', 'Ciprotab Tab 500mg By 10', 10, '2018-12-20', 880, 8800, 8800, 0, 8800, 'wholesale', 'webplay', '2018-11-26', 'Credit'),
(10, 'PP00001', 'NEW CHANCE PHARMACY', 'AMPICLOX Caps Beecham 500mg', 24, '2018-12-21', 5995, 143880, 263780, 260000, 3780, 'wholesale', 'webplay', '2018-11-26', 'cash'),
(11, 'PP00001', 'NEW CHANCE PHARMACY', 'AMPICLOX Caps Beecham 500mg', 10, '2018-12-21', 5995, 59950, 263780, 260000, 3780, 'wholesale', 'webplay', '2018-11-26', 'cash'),
(12, 'PP00001', 'NEW CHANCE PHARMACY', 'AMPICLOX Caps Beecham 500mg', 10, '2018-12-29', 5995, 59950, 263780, 260000, 3780, 'wholesale', 'webplay', '2018-11-26', 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE IF NOT EXISTS `stock` (
  `id` int(11) NOT NULL,
  `productname` text NOT NULL,
  `expirydate` date NOT NULL,
  `stockbought` int(11) NOT NULL,
  `stocksold` int(11) NOT NULL,
  `stockremain` int(11) NOT NULL,
  `entry_date` date NOT NULL,
  `entries` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `productname`, `expirydate`, `stockbought`, `stocksold`, `stockremain`, `entry_date`, `entries`) VALUES
(1, 'AMPICLOX Caps Beecham 500mg', '2018-12-21', 34, 34, 0, '2018-11-15', 1),
(2, 'AMPICLOX Caps Beecham 500mg', '2018-12-29', 57, 10, 47, '2018-11-26', 1),
(3, 'Ciprotab Tab 500mg By 10', '2018-12-20', 20, 10, 10, '2018-11-26', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stockentry`
--

CREATE TABLE IF NOT EXISTS `stockentry` (
  `id` int(11) NOT NULL,
  `entry_date` date NOT NULL,
  `product` text NOT NULL,
  `stockno` int(11) NOT NULL,
  `byadmin` text NOT NULL,
  `stockexpiry_date` date NOT NULL,
  `stocktype` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stockentry`
--

INSERT INTO `stockentry` (`id`, `entry_date`, `product`, `stockno`, `byadmin`, `stockexpiry_date`, `stocktype`) VALUES
(1, '2018-11-15', 'AMPICLOX Caps Beecham 500mg', 34, 'webplay', '2018-12-21', 'new'),
(2, '2018-11-26', 'AMPICLOX Caps Beecham 500mg', 57, 'webplay', '2018-12-29', 'new'),
(3, '2018-11-26', 'Ciprotab Tab 500mg By 10', 20, 'webplay', '2018-12-20', 'new');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `category` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `category`) VALUES
(2, 'jennifer', '$2y$11$4a69fd31cc9049b35d163ejd74.e5BW5ShM3.kyAZ7Ym9IAcI.ZlG', 'user'),
(3, 'joyce', '$2y$11$6605600a19c2900c5a492OkKED8aCoJL9ULRN4/QGR1puIYHkHDuq', 'user'),
(5, 'edith', '$2y$11$16de703b30b1b15e12225uuZx.G0mARjgf9RaOTLd2Kq.DKGlzTNm', 'user'),
(6, 'pricepoint', '$2y$11$b792f50b250da7e09629fuwSx3RPkopHEK.ILsn7UxqM91S3QuR9u', 'admin'),
(7, 'webplay', '$2y$11$5b55964a8d8b1e8736d8cOs0Veyq4lZcK0zaw1XnfvQnoqwyYVXFO', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users_session`
--

CREATE TABLE IF NOT EXISTS `users_session` (
  `session_log` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_role` varchar(20) NOT NULL,
  `log_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `log_off` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `logged_out` int(11) NOT NULL,
  `duration` time NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_session`
--

INSERT INTO `users_session` (`session_log`, `username`, `user_role`, `log_on`, `log_off`, `logged_out`, `duration`) VALUES
(1, 'webplay', 'admin', '2018-11-26 10:52:17', '0000-00-00 00:00:00', 0, '00:00:00'),
(2, 'webplay', 'admin', '2018-12-15 17:48:51', '0000-00-00 00:00:00', 0, '00:00:00'),
(3, 'webplay', 'admin', '2018-12-21 16:27:14', '0000-00-00 00:00:00', 0, '00:00:00'),
(4, 'webplay', 'admin', '2018-12-21 16:28:07', '0000-00-00 00:00:00', 0, '00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customerinvoice`
--
ALTER TABLE `customerinvoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stockentry`
--
ALTER TABLE `stockentry`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_session`
--
ALTER TABLE `users_session`
  ADD PRIMARY KEY (`session_log`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customerinvoice`
--
ALTER TABLE `customerinvoice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=104;
--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stockentry`
--
ALTER TABLE `stockentry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `users_session`
--
ALTER TABLE `users_session`
  MODIFY `session_log` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
