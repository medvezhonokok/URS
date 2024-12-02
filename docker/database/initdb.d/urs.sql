-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: maria-db:3306
-- Время создания: Авг 18 2024 г., 16:54
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
  `start_date` date NOT NULL,
  `informal_start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `informal_end_date` date NOT NULL,
  `company_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `company_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `company`
--

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL,
  `english_name` varchar(255) NOT NULL,
  `russian_name` varchar(255) NOT NULL,
  `english_address` varchar(255) NOT NULL,
  `russian_address` varchar(255) NOT NULL,
  `postal_or_zip_code` varchar(255) NOT NULL,
  `country_or_state` varchar(255) NOT NULL,
  `english_manager_name` varchar(255) NOT NULL,
  `russian_manager_name` varchar(255) NOT NULL,
  `manager_position` varchar(255) NOT NULL,
  `manager_phone_number` varchar(255) NOT NULL,
  `manager_email` varchar(255) NOT NULL,
  `web_site` varchar(255) NOT NULL,
  `english_contact_person_name` varchar(255) NOT NULL,
  `russian_contact_person_name` varchar(255) NOT NULL,
  `contact_person_position` varchar(255) NOT NULL,
  `contact_person_email` varchar(255) NOT NULL,
  `tin` varchar(255) NOT NULL,
  `okved` varchar(255) NOT NULL,
  `english_certification_scope` varchar(255) NOT NULL,
  `russian_certification_scope` varchar(255) NOT NULL,
  `creation_time` timestamp NULL DEFAULT current_timestamp(),
  `audit_criterion` varchar(50) NOT NULL,
  `certificate_number` varchar(55) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `certificate_expiration_date` date DEFAULT NULL,
  `closing_meeting_date` date DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `activity` varchar(50) NOT NULL,
  `agreement` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `company`
--

INSERT INTO `company` (`id`, `english_name`, `russian_name`, `english_address`, `russian_address`, `postal_or_zip_code`, `country_or_state`, `english_manager_name`, `russian_manager_name`, `manager_position`, `manager_phone_number`, `manager_email`, `web_site`, `english_contact_person_name`, `russian_contact_person_name`, `contact_person_position`, `contact_person_email`, `tin`, `okved`, `english_certification_scope`, `russian_certification_scope`, `creation_time`, `audit_criterion`, `certificate_number`, `user_id`, `certificate_expiration_date`, `closing_meeting_date`, `location`, `activity`, `agreement`) VALUES
(46, 'JSC “AKOM”', 'Акционерное Общество «АКОМ»(АО «АКОМ»)', 'n/a', '445359, Самарская обл., г. Жигулевск ,проезд Отважный, дом 22', '88', 'Российская Федерация', 'n/a', 'Бельцов Олег Александрович', 'Генеральный директор', '1', '1', '1', 'n/a', 'Губанова Ольга', 'Ведущий специалист по СМК', '1', '12345', '123456', 'n/a', 'n/a', '2024-06-23 15:31:12', 'IATF_16949_2016_ISO_9001_2015', '123456', 1, NULL, NULL, NULL, '', ''),
(48, 'JSC “Grasys”', 'Акционерное общество «Грасис» (АО «Грасис»)', 'n/a', 'Россия 121059, Москва, Бережковская наб. 38 к 1', '121059', 'Российская Федерация', 'n/a', 'Потехин Сергей Владимирович', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'Панин Игорь Александрович', 'n/a', 'n/a', '12345', '123456', 'n/a', 'n/a', '2024-06-23 15:57:12', 'ISO_37001_2016', 'n/a', 1, '2025-05-05', '2024-05-05', NULL, '', ''),
(49, '«Toplivnye systemy» Ltd', ' Общество с ограниченной ответственностью «Топливные системы»(ООО «Топливные системы»)', 'n/a', '192102, РФ., г.Санк-Петербург, ул. Самойловой, д.5, лит. Я', '192102', 'Российская Федерация', 'n/a', 'Филиппова Татьяна Васильевна', 'Управляющая компанией', 'n/a', 'n/a', 'n/a', 'n/a', 'Якупов Радик Ахматшаевич', 'Технический директор', 'n/a', '12345', '123456', 'n/a', 'n/a', '2024-06-23 16:03:44', 'IATF_16949_2016_ISO_9001_2015', NULL, 2, NULL, NULL, NULL, '', ''),
(50, 'Branch of JSC \"Cordiant\" in Yaroslavl (YTP)', 'Филиал АО «Кордиант» в г.Ярославле (ЯШЗ)', 'n/a', '150003, г.Ярославль, ул.Советская, 81', '150003', 'Российская Федерация', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'Нагацкая Ольга Валерьевна', 'Начальник службы производственного контроля', 'n/a', '12345', '123456', 'n/a', 'n/a', '2024-06-23 16:06:32', 'IATF_16949_2016_ISO_9001_2015', NULL, 1, NULL, NULL, NULL, '', ''),
(51, 'Branch of JSC \"Cordiant\" in Yaroslavl (YTP)', 'Филиал АО «Кордиант» в г.Ярославле (ЯШЗ)', 'n/a', '150003, г.Ярославль, ул.Советская, 81', '150003', 'Российская Федерация', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'Нагацкая Ольга Валерьевна', 'Начальник службы производственного контроля', 'n/a', '12345', '123456', 'n/a', 'n/a', '2024-06-23 16:08:01', 'IATF_16949_2016_ISO_9001_2015', '123', 10, NULL, NULL, NULL, '', ''),
(52, 'Рогаикопыта', 'roga', 'SPB', 'СПБ', '111111', 'РФ', 'Semibratov DA', 'Семибратов ДА', 'GM', '1111111111911', 'semibratov@roga.com', 'roga.com', 'Surnin VV', 'Сурнин ВВ', 'Manager', 'manager@roga.com', '90109909900', '90.01', 'Consulting', 'Консалтинг', '2024-06-25 15:17:14', 'IATF_16949_2016_ISO_9001_2015', ' ', 1, NULL, NULL, NULL, '', ''),
(56, 'ОАО «Саранский завод «Резинотехника»»', 'OJSC \"Saranski zavod \"REZINOTECHNIKA\"', '2', '12', '1', '1', '12', 'Костина Галина Петровна   Смирнова Оксана Витальевна', '1', '(8342) 59-51-75', 'ostk@szrt.ru  ', '1', '1', 'Грибанов Юрий Михайлович', 'Управляющий директор  ООО «Рабэкс Групп» ', 'G.Kostina@rubexgroup.ru', '1', '1', '1', '1', '2024-07-10 11:07:01', 'IATF_16949_2016_ISO_9001_2015', 'n/a', 1, NULL, NULL, NULL, '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `phone_number` varchar(12) NOT NULL,
  `login` varchar(24) NOT NULL,
  `name` varchar(24) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_sha` varchar(250) DEFAULT NULL,
  `role` enum('CEO','WORKER','ADMIN') DEFAULT 'WORKER',
  `certificates` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `phone_number`, `login`, `name`, `email`, `password_sha`, `role`, `certificates`) VALUES
(1, '77777777777', 'mike', 'Michael Kim', 'mike@gmail.com', '288b59371d698e8bfd4da39be2bb073fc44e7c96', 'ADMIN', '1#0#0#1#1#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0'),
(2, '79999999999', 'vsyrnin', 'Василий Сурнин', 'test@gmail.com', '1ecbf4f5bd1281d984d837c37e521e0ea07023fc', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(3, '78888888888', 'sdmitrienkov', 'Сергей Дмитриенков', 'test@gmail.com', '601022870e5cf74876f52aa9ff4ca8b4c3b1df1d', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(4, '77777777777', 'abugaev', 'Бугаев А.Л.', 'test@gmail.com', '43afa4f720c74a337d25385d470ce399e1e20799', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(5, '77777777777', 'avorobyev', 'Воробьёв А.Ю.', 'test@gmail.com', '9bb2e6439d19009ac43366501c5526c91f815607', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(6, '77777777777', 'kgrabova', 'Грабова К.С.', 'test@gmail.com', '14c62874e41e64f50027caf3f7d2c4c08e8da631', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(9, '77777777777', 'ekorzhuk', 'Коржук Е.Р.', 'test@gmail.com', 'fad5fcf3386fcde791afa780b99517dd05bef1b1', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(10, '77777777777', 'tlebedeva', 'Лебедева Т.М.', 'test@gmail.com', 'f510ce085c36ef08e4b8ad45ed3fae709e5db584', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(11, '77777777777', 'lnazarenko', 'Назаренко Л.А.', 'test@gmail.com', 'ee6aaab4e33bff5cc0c1f1d82a119217e3c9d477', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(12, '77777777777', 'inigrey', 'Нигрей И.И.', 'test@gmail.com', 'ca29e5d803b3dd62ba7491d8adaed469904c3391', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(13, '77777777777', 'mnovitsky', 'Новицкий М.М.', 'test@gmail.com', '5afbcf46b6f5a5601021a59c84b03ad256bf94c2', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(14, '77777777777', 'iperelyotova', 'Перелётова И.Н.', 'test@gmail.com', '1a96f4fa9266385eedcaed7fc8917f0e724cc50a', 'WORKER', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1'),
(15, '77777777777', 'dsemibratov', 'Семибратов Д.А.', 'test@gmail.com', '98e4065e4e28bfb83cc4eedff7335ebd9d18ff7c', 'CEO', '1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1#1');

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT для таблицы `company`
--
ALTER TABLE `company`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
