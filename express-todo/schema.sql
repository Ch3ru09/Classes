CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taskName` varchar(255) NOT NULL,
  `taskDescription` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'unchecked',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
