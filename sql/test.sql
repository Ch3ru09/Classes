CREATE TABLE my_guests (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(50),
  reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) 

INSERT INTO table_name (column1, column2, column3,...)
VALUES (value1, value2, value3,...) 

insert into my_guests (firstname, lastname, email)
values ('San', 'Zhang', 'zhangsan@gmail.com');

insert into my_guests (firstname, lastname, email)
values ('Si', 'Li', 'lisi@gmail.com');

insert into my_guests (firstname, lastname, email)
values ('Wu', 'Wang', 'wangwu@gmail.com');

insert into my_guests (firstname, lastname, email)
values ('Liu', 'Zhao', 'zhaoliu@gmail.com');


SELECT * FROM my_guests;

select * from my_guests where firstname = 'Si';

select * from my_guests where reg_date <= '2021-07-13 14:56:59';

select lastname from my_guests where firstname != 'Si' and reg_date < '2021-07-13 14:56:59';

select lastname from my_guests where firstname != 'Si' or reg_date < '2021-07-13 14:56:59';

select * from my_guests order by reg_date desc, firstname desc;

delete from my_guests where firstname = 'Liu';

update my_guests set firstname = 'Si1', lastname = 'Li1' where id = 2;

select * from my_guests limit 2 offset 2;

