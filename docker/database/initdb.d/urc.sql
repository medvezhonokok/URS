-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: maria-db:3306
-- Время создания: Май 24 2024 г., 09:48
-- Версия сервера: 10.11.7-MariaDB-1:10.11.7+maria~ubu2204
-- Версия PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `urc`
--

-- --------------------------------------------------------

--
-- Структура таблицы `certificate`
--

CREATE TABLE `certificate` (
  `id` bigint(20) NOT NULL,
  `certificate_type` varchar(40) NOT NULL,
  `certificate_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `certificate`
--

INSERT INTO `certificate` (`id`, `certificate_type`, `certificate_number`) VALUES
(4, 'IATF_16949', '377400'),
(5, 'IATF_16949', '436135'),
(6, 'ГОСТР_58139', '0011/SM/ENG');

-- --------------------------------------------------------

--
-- Структура таблицы `company`
--

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL,
  `certificate_id` bigint(20) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) NOT NULL,
  `path_to_receipt_of_payment` varchar(255) DEFAULT NULL,
  `in_process` tinyint(1) NOT NULL DEFAULT 0,
  `company_address` varchar(255) NOT NULL,
  `postal_or_zip_code` varchar(50) NOT NULL,
  `country_or_state` varchar(100) NOT NULL,
  `company_ceo_name` varchar(255) NOT NULL,
  `head_phone_number` varchar(50) NOT NULL,
  `head_email` varchar(255) NOT NULL,
  `web_site` varchar(255) NOT NULL,
  `contact_person_name` varchar(255) NOT NULL,
  `contact_person_email` varchar(255) NOT NULL,
  `tin` varchar(50) NOT NULL,
  `okved` varchar(50) NOT NULL,
  `requested_accreditation` varchar(255) NOT NULL,
  `product_type` varchar(255) NOT NULL,
  `total_worker_count` bigint(20) DEFAULT 0,
  `organization_shift_number` bigint(20) DEFAULT 0,
  `working_day_duration_hours` bigint(20) DEFAULT 0,
  `primary_language` varchar(100) NOT NULL,
  `currency_used` varchar(100) NOT NULL,
  `creation_time` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `company`
--

INSERT INTO `company` (`id`, `certificate_id`, `about`, `company_name`, `path_to_receipt_of_payment`, `in_process`, `company_address`, `postal_or_zip_code`, `country_or_state`, `company_ceo_name`, `head_phone_number`, `head_email`, `web_site`, `contact_person_name`, `contact_person_email`, `tin`, `okved`, `requested_accreditation`, `product_type`, `total_worker_count`, `organization_shift_number`, `working_day_duration_hours`, `primary_language`, `currency_used`, `creation_time`) VALUES
(3, 4, 'СТРАНА: РФ, КТО ЗАКЛЮЧИЛ КОНТРАКТ: Бугаев, ЧЕЙ КЛИЕНТ: ЮРС-РУСЬ', 'LLC \"SLON-AVTO\"', NULL, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, '', '', '2024-05-24 09:37:07'),
(4, 5, 'СТРАНА: РБ, КТО ЗАКЛЮЧИЛ КОНТРАКТ: Валов, ЧЕЙ КЛИЕНТ: ЮРС-РУСЬ', 'JSC \"BORISOV Plant of Aggregates\"', NULL, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, '', '', '2024-05-24 09:37:07'),
(5, 6, 'СТРАНА: РБ, КТО ЗАКЛЮЧИЛ КОНТРАКТ: Валов, ЧЕЙ КЛИЕНТ: ЮРС-РУСЬ', 'JSC \"BORISOV Plant of Aggregates\"', NULL, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, '', '', '2024-05-24 09:37:07');

-- --------------------------------------------------------

--
-- Структура таблицы `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `status` varchar(250) NOT NULL DEFAULT 'TODO',
  `input_url` varchar(250) NOT NULL DEFAULT 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy',
  `output_url` varchar(250) NOT NULL DEFAULT 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `task`
--

INSERT INTO `task` (`id`, `content`, `user_id`, `company_id`, `deadline`, `status`, `input_url`, `output_url`) VALUES
(6, 'Уточнение информации', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(7, 'Уточнение информации', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(8, 'Уточнение информации', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(9, 'Анализ заявки', 2, 3, '2024-04-10 03:57:00', 'DONE', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(10, 'Анализ заявки', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(11, 'Анализ заявки', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(12, 'Коммерческое предложение', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(13, 'Коммерческое предложение', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(14, 'Коммерческое предложение', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(15, 'Подготовка договора на сертификацию', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(16, 'Подготовка договора на сертификацию', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(17, 'Подготовка договора на сертификацию', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(18, 'Заключение договора на сертификацию', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(19, 'Заключение договора на сертификацию', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(20, 'Заключение договора на сертификацию', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(21, 'Планирование дат 1, 2 этапов сертификационного аудита, состава экспертной группы', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(22, 'Планирование дат 1, 2 этапов сертификационного аудита, состава экспертной группы', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(23, 'Планирование дат 1, 2 этапов сертификационного аудита, состава экспертной группы', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(24, 'Планирование 1 этапа сертификационного аудита', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(25, 'Планирование 1 этапа сертификационного аудита', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(26, 'Планирование 1 этапа сертификационного аудита', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(27, 'Выполнение 1 этапа сертификационного аудита', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(28, 'Выполнение 1 этапа сертификационного аудита', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(29, 'Выполнение 1 этапа сертификационного аудита', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(30, 'Планирование 2 этапа сертификационного аудита', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(31, 'Планирование 2 этапа сертификационного аудита', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(32, 'Планирование 2 этапа сертификационного аудита', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(33, 'Выполнение 2 этапа сертификационного аудита', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(34, 'Выполнение 2 этапа сертификационного аудита', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(35, 'Выполнение 2 этапа сертификационного аудита', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(36, 'Контроль подготовки корректирующих действий', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(37, 'Контроль подготовки корректирующих действий', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(38, 'Контроль подготовки корректирующих действий', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(39, 'Контроль выполнения корректирующих действий', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(40, 'Контроль выполнения корректирующих действий', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(41, 'Контроль выполнения корректирующих действий', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(42, 'Подготовка решения о выдаче сертификата соответствия', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(43, 'Подготовка решения о выдаче сертификата соответствия', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(44, 'Подготовка решения о выдаче сертификата соответствия', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(45, 'Согласование сертификата соответствия с заказчиком', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(46, 'Согласование сертификата соответствия с заказчиком', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(47, 'Согласование сертификата соответствия с заказчиком', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(48, 'Выпуск сертификата соответствия', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(49, 'Выпуск сертификата соответствия', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(50, 'Выпуск сертификата соответствия', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(51, 'Передача сертификата соответствия', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(52, 'Передача сертификата соответствия', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(53, 'Передача сертификата соответствия', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(54, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(55, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(56, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(57, 'Планирование дат 1 надзорного аудита (не позднее 1 года после заключительного совещания сертификационного аудита), состава экспертной группы', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(58, 'Планирование дат 1 надзорного аудита (не позднее 1 года после заключительного совещания сертификационного аудита), состава экспертной группы', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(59, 'Планирование дат 1 надзорного аудита (не позднее 1 года после заключительного совещания сертификационного аудита), состава экспертной группы', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(60, 'Планирование 1 надзорного аудита', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(61, 'Планирование 1 надзорного аудита', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(62, 'Планирование 1 надзорного аудита', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(63, 'Выполнение 1 надзорного аудита', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(64, 'Выполнение 1 надзорного аудита', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(65, 'Выполнение 1 надзорного аудита', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(66, 'Контроль подготовки корректирующих действий', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(67, 'Контроль подготовки корректирующих действий', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(68, 'Контроль подготовки корректирующих действий', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(69, 'Контроль выполнения корректирующих действий', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(70, 'Контроль выполнения корректирующих действий', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(71, 'Контроль выполнения корректирующих действий', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(72, 'Подготовка решения о продлении/изменении сертификата соответствия', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(73, 'Подготовка решения о продлении/изменении сертификата соответствия', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(74, 'Подготовка решения о продлении/изменении сертификата соответствия', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(75, 'Согласование сертификата соответствия с заказчиком (в случае изменения)', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(76, 'Согласование сертификата соответствия с заказчиком (в случае изменения)', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(77, 'Согласование сертификата соответствия с заказчиком (в случае изменения)', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(78, 'Выпуск сертификата соответствия (в случае изменения)', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(79, 'Выпуск сертификата соответствия (в случае изменения)', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(80, 'Выпуск сертификата соответствия (в случае изменения)', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(81, 'Передача сертификата соответствия (в случае изменения)', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(82, 'Передача сертификата соответствия (в случае изменения)', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(83, 'Передача сертификата соответствия (в случае изменения)', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(84, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(85, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(86, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 5, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(87, 'Планирование дат 2 надзорного аудита (не позднее 1 года после заключительного совещания 1 надзорного аудита), состава экспертной группы', NULL, 3, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(88, 'Планирование дат 2 надзорного аудита (не позднее 1 года после заключительного совещания 1 надзорного аудита), состава экспертной группы', NULL, 4, '2024-04-10 03:57:00', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(89, 'Планирование дат 2 надзорного аудита (не позднее 1 года после заключительного совещания 1 надзорного аудита), состава экспертной группы', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(90, 'Планирование 2 надзорного аудита', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(91, 'Планирование 2 надзорного аудита', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(92, 'Планирование 2 надзорного аудита', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(93, 'Выполнение 2 надзорного аудита', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(94, 'Выполнение 2 надзорного аудита', 3, 4, '2024-04-10 03:57:01', 'DONE', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(95, 'Выполнение 2 надзорного аудита', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(96, 'Контроль подготовки корректирующих действий', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(97, 'Контроль подготовки корректирующих действий', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(98, 'Контроль подготовки корректирующих действий', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(99, 'Контроль выполнения корректирующих действий', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(100, 'Контроль выполнения корректирующих действий', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(101, 'Контроль выполнения корректирующих действий', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(102, 'Подготовка решения о продлении/изменении сертификата соответствия', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(103, 'Подготовка решения о продлении/изменении сертификата соответствия', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(104, 'Подготовка решения о продлении/изменении сертификата соответствия', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(105, 'Согласование сертификата соответствия с заказчиком (в случае изменения)', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(106, 'Согласование сертификата соответствия с заказчиком (в случае изменения)', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(107, 'Согласование сертификата соответствия с заказчиком (в случае изменения)', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(108, 'Выпуск сертификата соответствия (в случае изменения)', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(109, 'Выпуск сертификата соответствия (в случае изменения)', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(110, 'Выпуск сертификата соответствия (в случае изменения)', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(111, 'Передача сертификата соответствия (в случае изменения)', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(112, 'Передача сертификата соответствия (в случае изменения)', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(113, 'Передача сертификата соответствия (в случае изменения)', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(114, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(115, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(116, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(117, 'Подготовка договора на ресертификацию', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(118, 'Подготовка договора на ресертификацию', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(119, 'Подготовка договора на ресертификацию', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(120, 'Заключение договора на ресертификацию', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(121, 'Заключение договора на ресертификацию', 3, 4, '2024-04-10 03:57:01', 'DONE', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(122, 'Заключение договора на ресертификацию', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(123, 'Планирование дат 1, 2 этапов ресертификационного аудита (не позднее 1 года после даты проведения заключительного совещания 2 надзорного аудита), состава экспертной группы', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(124, 'Планирование дат 1, 2 этапов ресертификационного аудита (не позднее 1 года после даты проведения заключительного совещания 2 надзорного аудита), состава экспертной группы', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(125, 'Планирование дат 1, 2 этапов ресертификационного аудита (не позднее 1 года после даты проведения заключительного совещания 2 надзорного аудита), состава экспертной группы', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(126, 'Планирование 1 этапа ресертификационного аудита', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(127, 'Планирование 1 этапа ресертификационного аудита', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(128, 'Планирование 1 этапа ресертификационного аудита', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(129, 'Выполнение 1 этапа ресертификационного аудита', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(130, 'Выполнение 1 этапа ресертификационного аудита', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(131, 'Выполнение 1 этапа ресертификационного аудита', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(132, 'Планирование 2 этапа ресертификационного аудита', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(133, 'Планирование 2 этапа ресертификационного аудита', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(134, 'Планирование 2 этапа ресертификационного аудита', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(135, 'Выполнение 2 этапа ресертификационного аудита', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(136, 'Выполнение 2 этапа ресертификационного аудита', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(137, 'Выполнение 2 этапа ресертификационного аудита', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(138, 'Контроль подготовки корректирующих действий', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(139, 'Контроль подготовки корректирующих действий', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(140, 'Контроль подготовки корректирующих действий', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(141, 'Контроль выполнения корректирующих действий', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(142, 'Контроль выполнения корректирующих действий', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(143, 'Контроль выполнения корректирующих действий', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(144, 'Подготовка решения о выдаче сертификата соответствия', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(145, 'Подготовка решения о выдаче сертификата соответствия', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(146, 'Подготовка решения о выдаче сертификата соответствия', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(147, 'Согласование сертификата соответствия с заказчиком', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(148, 'Согласование сертификата соответствия с заказчиком', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(149, 'Согласование сертификата соответствия с заказчиком', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(150, 'Выпуск сертификата соответствия', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(151, 'Выпуск сертификата соответствия', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(152, 'Выпуск сертификата соответствия', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(153, 'Передача сертификата соответствия', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(154, 'Передача сертификата соответствия', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(155, 'Передача сертификата соответствия', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(156, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(157, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(158, 'Закрытие договора (части договора, если договор заключен на 3 года)', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(159, 'Повторение п. 18-37', NULL, 3, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(160, 'Повторение п. 18-37', NULL, 4, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1'),
(161, 'Повторение п. 18-37', NULL, 5, '2024-04-10 03:57:01', 'TODO', 'https://cloud.mail.ru/public/FyQ4/yhHAuktWy', 'https://cloud.mail.ru/public/PkjM/U3YtT26m1');

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
  `in_process` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `phone_number`, `login`, `name`, `about`, `password_sha`, `user_role`, `in_process`) VALUES
(1, '77777777777', 'mike', 'Michael Kim', 'empty text', '288b59371d698e8bfd4da39be2bb073fc44e7c96', 'CEO', 0),
(2, '79999999999', 'vsyrnin', 'Василий Сурнин', 'empty text', '1ecbf4f5bd1281d984d837c37e521e0ea07023fc', 'WORKER', 0),
(3, '78888888888', 'sdmitrienkov', 'Сергей Дмитриенков', 'empty text', '601022870e5cf74876f52aa9ff4ca8b4c3b1df1d', 'WORKER', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `certificate`
--
ALTER TABLE `certificate`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `certificate_id` (`certificate_id`);

--
-- Индексы таблицы `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `company_id` (`company_id`);

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
-- AUTO_INCREMENT для таблицы `certificate`
--
ALTER TABLE `certificate`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT для таблицы `company`
--
ALTER TABLE `company`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`certificate_id`) REFERENCES `certificate` (`id`);

--
-- Ограничения внешнего ключа таблицы `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
