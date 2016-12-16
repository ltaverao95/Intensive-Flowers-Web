-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-12-2016 a las 02:55:51
-- Versión del servidor: 10.1.16-MariaDB
-- Versión de PHP: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `intensiveflowers`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bouquet_order`
--

CREATE TABLE `bouquet_order` (
  `id` int(11) NOT NULL,
  `identity_card` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `surname` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `addressToSend` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `phone` int(15) NOT NULL,
  `email` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `orderDescription` varchar(253) COLLATE utf8_spanish_ci NOT NULL,
  `store` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `wayToPay` varchar(35) COLLATE utf8_spanish_ci NOT NULL,
  `dateOrder` date NOT NULL,
  `dateToSend` date NOT NULL,
  `timeToSend` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(254) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id_login_user` int(11) NOT NULL,
  `user_name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(15) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id_login_user`, `user_name`, `password`) VALUES
(1, 'admin', 'admin2016');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(254) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_logued_info`
--

CREATE TABLE `user_logued_info` (
  `id_login_user` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `surname` varchar(80) NOT NULL,
  `phone` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bouquet_order`
--
ALTER TABLE `bouquet_order`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login_user`);

--
-- Indices de la tabla `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_logued_info`
--
ALTER TABLE `user_logued_info`
  ADD KEY `id_login_user` (`id_login_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bouquet_order`
--
ALTER TABLE `bouquet_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id_login_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `user_logued_info`
--
ALTER TABLE `user_logued_info`
  ADD CONSTRAINT `user_logued_info_ibfk_1` FOREIGN KEY (`id_login_user`) REFERENCES `login` (`id_login_user`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
