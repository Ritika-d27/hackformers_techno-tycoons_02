-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Mar 19, 2023 at 07:44 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `farmers_hackathon_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(15) NOT NULL,
  `farmer_id` int(15) NOT NULL,
  `title` varchar(255) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `date` date NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `farmer_id`, `title`, `heading`, `content`, `date`, `image`) VALUES
(2, 2, 'Todays Motivation', 'This is what made me proud to be farmer!', '“I would rather be on my farm than be emperor of the world.” – George Washington', '2023-03-19', 'blog1.jpg'),
(3, 2, 'Todays Motivation', 'This is what made me proud to be farmer!', '“I would rather be on my farm than be emperor of the world.” – George Washington', '2023-03-19', 'blog1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(15) NOT NULL,
  `pid` int(15) NOT NULL,
  `uid` int(15) NOT NULL,
  `quantity` int(15) NOT NULL,
  `quantype` varchar(255) NOT NULL,
  `price` bigint(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(15) NOT NULL,
  `paid_user` int(15) NOT NULL,
  `price` bigint(15) NOT NULL,
  `payment_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `paid_user`, `price`, `payment_id`) VALUES
(1, 1, 300, 'pay_LTHu26DkWVsD1k');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `farmer_id` int(11) NOT NULL,
  `category` enum('grains','fruits','vegetables','milk') NOT NULL,
  `pname` varchar(255) NOT NULL,
  `pdesc` varchar(255) NOT NULL,
  `pquantype` enum('dozen','kgs','ltr','') NOT NULL,
  `pquan` int(20) NOT NULL,
  `pprice` bigint(50) NOT NULL,
  `pimage` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `farmer_id`, `category`, `pname`, `pdesc`, `pquantype`, `pquan`, `pprice`, `pimage`) VALUES
(1, 2, 'grains', 'Rice', 'Nutritious,Healthy', 'kgs', 10, 500, 'Rice.jpg'),
(2, 2, 'fruits', 'Mango', 'Mango is the king of taste', 'dozen', 3, 600, 'Mango.jpg'),
(3, 2, 'vegetables', 'Tomato', 'Vitamins', 'kgs', 2, 100, 'Tomato.jpg'),
(4, 2, 'milk', 'Milk', 'Healthy', '', 1, 50, 'Milk.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `type` enum('farmer','customer') NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` bigint(11) NOT NULL,
  `address` text NOT NULL,
  `password` text NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `type`, `name`, `email`, `phone`, `address`, `password`, `created_on`) VALUES
(1, 'customer', 'Husain Champawala', 'husainchampawala@gmail.com', 8879525311, 'Vashind', '$2y$10$e3VmLIHZPnKr83.0fNmprel4pWUCWNGHmm3/zz775x.hyzZPDyhKC', '2023-03-18 22:43:21'),
(2, 'farmer', 'XYZ', 'xyz@gmail.com', 123456789, 'India', '$2y$10$vyWD4R9A9xQuPBHexnhzWugkRq4dz/RQixVA05TRDCN8WlcyHNddm', '2023-03-18 22:45:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
