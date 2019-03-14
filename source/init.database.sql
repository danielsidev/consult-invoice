
-- Copy and paste each block of sql code into mysql terminal one by one. 
-- Paste the next code block, only after the previous be execute.

-- Start - Create Database 
CREATE DATABASE stone;
-- End - Create Database 

-- Start - Create User Database with Password 
CREATE USER 'admStone'@'localhost' IDENTIFIED BY 'admStone'; 
-- End - Create User Database with Password 

-- Start - Set Privileges 
GRANT ALL PRIVILEGES ON stone.* TO 'admStone'@'localhost';
-- End - Set Privileges 

-- Start - Update Privileges
FLUSH PRIVILEGES;
-- End - Update Privileges

-- Start - Choice database
use stone;
-- End - Choice database

-- Start - Create Table invoice
CREATE TABLE invoice (
  IdInvoice int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  CreatedAt datetime NOT NULL,
  ReferenceMonth int(11) NOT NULL,
  ReferenceYear int(11) NOT NULL,
  Document varchar(14) NOT NULL,
  Description varchar(256) NOT NULL,
  Amount decimal(16,2) NOT NULL,
  IsActive tinyint(1) NOT NULL,
  DesactiveAt datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
);

-- End - Create Table invoice

-- Start -- Insert register into invoice

INSERT INTO `invoice` (`IdInvoice`, `CreatedAt`, `ReferenceMonth`, `ReferenceYear`, `Document`, `Description`, `Amount`, `IsActive`, `DesactiveAt`) VALUES
(1, '2019-03-10 13:30:10', 3, 2019, '37495060373786', 'Refeição', '10.00', 1, '0000-00-00 00:00:00'),
(2, '2019-03-10 15:10:06', 3, 2019, '37495060373787', 'Café Expresso', '5.50', 1, '0000-00-00 00:00:00'),
(3, '2019-03-10 19:40:10', 3, 2019, '37495060373788', 'Suco de Laranja', '15.50', 1, '0000-00-00 00:00:00'),
(4, '2019-02-20 10:06:00', 2, 2019, '37495060373756', 'Pão Sírio', '10.50', 1, '0000-00-00 00:00:00'),
(5, '2019-02-10 20:06:00', 2, 2019, '37495060373740', 'Smartphone Motorola  ', '1240.99', 1, '0000-00-00 00:00:00'),
(6, '2019-02-01 08:30:50', 2, 2019, '37495060373770', 'Fone de ouvido ', '50.50', 1, '0000-00-00 00:00:00'),
(7, '2019-01-09 14:15:50', 1, 2019, '37495060373710', 'Pilhas Pequenas ', '9.50', 1, '0000-00-00 00:00:00'),
(8, '2019-01-15 18:05:10', 1, 2019, '37495060373706', 'Caderno ', '20.50', 1, '0000-00-00 00:00:00'),
(9, '2019-01-20 11:30:25', 1, 2019, '37495060373701', 'Playstation 4 ', '2599.99', 1, '0000-00-00 00:00:00'),
(10, '2019-01-25 17:07:08', 1, 2019, '37495060373410', 'Sorvete Napolitano', '30.99', 1, '0000-00-00 00:00:00');
-- End -- Insert register into invoice


-- Start - Token Blacklist
CREATE TABLE `token_blacklist` (
  `id_token` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `date_token` date NOT NULL,
  `time_token` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `token_blacklist` (`id_token`, `token`, `date_token`, `time_token`) VALUES
(5, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiM19EYW5pZWwgTWVsbG8gU2lxdWVpcmFfYWRlcHRvZGFuaWVsQGdtYWlsLmNvbSIsImlhdCI6MTUzOTgyMTI2NSwiZXhwIjoxNTM5ODI1NDY1fQ.EuZm9w6QfC3qGEG35xa9a9JTF2RBvvcZJ2ZtpEZ0AMw', '2018-10-17', '21:07:48');
-- End - Token Blacklist
