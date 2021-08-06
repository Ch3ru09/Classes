-- my_todos.tasks definition
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taskName` varchar(255) NOT NULL,
  `taskDescription` varchar(255) DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT 'unfinished',
  `userId` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


-- my_todos.users definition
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `reg_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;