-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2016 a las 23:51:35
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

--
-- Volcado de datos para la tabla `bouquet_order`
--

INSERT INTO `bouquet_order` (`id`, `identity_card`, `name`, `surname`, `addressToSend`, `phone`, `email`, `orderDescription`, `store`, `wayToPay`, `dateOrder`, `dateToSend`, `timeToSend`) VALUES
(1, 1053845970, 'Felipe', 'Tavera', 'Cra 36 a # 97 b 17', 8916391, 'lftavera@hotmail.com', 'Rosas', '1', '0', '2016-12-13', '2016-12-12', '1970-01-01T06:01:00.000Z'),
(2, 1014567829, 'Marcela', 'Lopez', 'Cra 20 - 12', 8965473, 'marcela@hotmail.com', 'Flores amarillas', '2', '0', '2016-12-13', '2016-12-12', '1970-01-01T06:01:00.000Z'),
(3, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(4, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(5, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(6, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(7, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(8, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(9, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(10, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(11, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(12, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(13, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(14, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(15, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(16, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(17, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(18, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(19, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(20, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(21, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(22, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(23, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(24, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(25, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50'),
(26, 1053845970, 'Marco', 'Parra', 'Cra 36', 891, 'marco@hotmail', 'Rosas', '1', 'Tarjeta DÃ©bito', '2016-12-13', '2016-12-13', '07:50');

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

--
-- Volcado de datos para la tabla `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `phone`, `message`) VALUES
(1, 'Felipe', 'lftavera@hotmail.com', '3005268836', 'Muy puntuales.'),
(2, 'Maria', 'maria@hotmail.com', '3201547986', 'Que bonitos productos'),
(3, 'Luis', 'luis@gmail.com', '3148564231', 'Pedido a tiempo'),
(4, 'Marcela Cardenas', 'marcelacardenas@gmail.com', '3004329784', 'Gracias por cumplir'),
(5, 'Luisa Ramirez', 'luisaramirez95@hotmail.com', '3124567894', 'Gracias'),
(6, 'Marcos Parra', 'mparra12@gmail.com', '3178964530', 'Buena coordinaciÃ³n'),
(7, 'Andrea Zuluaga', 'andreaz65@gmail.com', '3128972156', 'Gracias'),
(8, 'David LondoÃ±o', 'davidl@hotmail.es', '3164956478', 'PodrÃ­an enviarme un mapa con mejores coordenadas de las tiendas ?'),
(10, 'asd', 'lftavera@hotmail.com', '423', 'asd'),
(11, 'Felipe', 'lftavera@hotmail.com', '3005268836', 'Prueba'),
(12, 'Marcela', 'marcela@hotmail.com', '3268975640', 'Hola');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `user` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(15) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id`, `user`, `pass`) VALUES
(1, 'FelipeT', 'felipe0025'),
(2, 'Admin', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(254) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `message`
--

INSERT INTO `message` (`id`, `name`, `message`) VALUES
(1, 'Felipe', 'test'),
(2, 'Mariana', 'Hola'),
(3, 'Carlos', 'Hola'),
(4, 'Luisa', 'Hola'),
(5, 'Marcos', 'Hola'),
(6, 'Manuela', 'Que tal'),
(7, 'Carla', 'Hola'),
(8, 'carlos', 'hola'),
(9, 'Marcela', 'hola');

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
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bouquet_order`
--
ALTER TABLE `bouquet_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT de la tabla `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
