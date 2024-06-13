-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: maria-db:3306
-- Время создания: Июн 11 2024 г., 20:58
-- Версия сервера: 10.11.8-MariaDB-ubu2204
-- Версия PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `urs`
--

-- --------------------------------------------------------

--
-- Структура таблицы `audit`
--

CREATE TABLE `audit` (
  `id` bigint(20) NOT NULL,
  `location` varchar(100) NOT NULL,
  `activity` varchar(100) NOT NULL,
  `agreement` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `closing_meeting_date` date NOT NULL,
  `certificate_expiration_date` date NOT NULL,
  `company_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `company_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `audit`
--

INSERT INTO `audit` (`id`, `location`, `activity`, `agreement`, `start_date`, `end_date`, `closing_meeting_date`, `certificate_expiration_date`, `company_id`, `user_id`, `company_name`) VALUES
(54, '11', '11', '11', '2024-06-06', '2024-06-18', '2024-06-01', '2024-06-08', 41, 1, '1'),
(55, '22', '22', '22', '2024-06-06', '2024-06-18', '2024-06-01', '2024-06-08', 42, 2, '2');

-- --------------------------------------------------------

--
-- Структура таблицы `company`
--

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL,
  `english_name` varchar(255) NOT NULL,
  `russian_name` varchar(255) NOT NULL,
  `english_address` varchar(255) NOT NULL,
  `russian_address` varchar(55) NOT NULL,
  `postal_or_zip_code` varchar(50) NOT NULL,
  `country_or_state` varchar(100) NOT NULL,
  `english_manager_name` varchar(255) NOT NULL,
  `russian_manager_name` varchar(25) NOT NULL,
  `manager_position` varchar(55) NOT NULL,
  `manager_phone_number` varchar(50) NOT NULL,
  `manager_email` varchar(255) NOT NULL,
  `web_site` varchar(255) NOT NULL,
  `english_contact_person_name` varchar(255) NOT NULL,
  `russian_contact_person_name` varchar(50) NOT NULL,
  `contact_person_position` varchar(50) NOT NULL,
  `contact_person_email` varchar(255) NOT NULL,
  `tin` varchar(50) NOT NULL,
  `okved` varchar(50) NOT NULL,
  `english_certification_scope` varchar(100) NOT NULL,
  `russian_certification_scope` varchar(100) NOT NULL,
  `creation_time` timestamp NULL DEFAULT current_timestamp(),
  `audit_criterion` varchar(50) NOT NULL,
  `certificate_number` varchar(55) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `company`
--

INSERT INTO `company` (`id`, `english_name`, `russian_name`, `english_address`, `russian_address`, `postal_or_zip_code`, `country_or_state`, `english_manager_name`, `russian_manager_name`, `manager_position`, `manager_phone_number`, `manager_email`, `web_site`, `english_contact_person_name`, `russian_contact_person_name`, `contact_person_position`, `contact_person_email`, `tin`, `okved`, `english_certification_scope`, `russian_certification_scope`, `creation_time`, `audit_criterion`, `certificate_number`, `user_id`) VALUES
(41, '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '2024-06-11 19:48:36', 'ISO_14001_2015', 'NEW CERTIFICATE NUMBER', 1),
(42, '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2024-06-11 19:52:05', 'ISO_37001_2016', 'NNNN', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `phone_number` varchar(12) NOT NULL,
  `login` varchar(24) NOT NULL,
  `name` varchar(24) NOT NULL,
  `about` varchar(250) DEFAULT NULL,
  `password_sha` varchar(250) DEFAULT NULL,
  `user_role` enum('CEO','WORKER') NOT NULL,
  `certificates` varchar(100) DEFAULT NULL,
  `in_process` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `phone_number`, `login`, `name`, `about`, `password_sha`, `user_role`, `certificates`, `in_process`) VALUES
(1, '77777777777', 'mike', 'Michael Kim', 'empty text', '288b59371d698e8bfd4da39be2bb073fc44e7c96', 'CEO', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1', 0),
(2, '79999999999', 'vsyrnin', 'Василий Сурнин', 'empty text', '1ecbf4f5bd1281d984d837c37e521e0ea07023fc', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1', 0),
(3, '78888888888', 'sdmitrienkov', 'Сергей Дмитриенков', 'empty text', '601022870e5cf74876f52aa9ff4ca8b4c3b1df1d', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `audit`
--
ALTER TABLE `audit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_company_id` (`company_id`);

--
-- Индексы таблицы `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `audit`
--
ALTER TABLE `audit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT для таблицы `company`
--
ALTER TABLE `company`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `audit`
--
ALTER TABLE `audit`
  ADD CONSTRAINT `fk_company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

--
-- Ограничения внешнего ключа таблицы `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
