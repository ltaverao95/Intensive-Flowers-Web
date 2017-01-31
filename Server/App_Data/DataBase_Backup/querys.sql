/*---GET USER:---*/

SELECT user_logued_inf.*, login_user.* 
FROM `user_logued_info` user_logued_inf
inner join `login` login_user on user_logued_inf.id_login_user = login_user.id_login_user 
WHERE user_logued_inf.id_login_user = 1

/*---------------------------------------------------------------------*/

/*---CREATE USER:---*/

INSERT INTO `login`
    SET `id_login_user` = NULL, 
        `user` = 'test', 
        `pass` = '123';
INSERT INTO `user_logued_info`
    SET `id_login_user` = LAST_INSERT_ID(),
	    `name` = 'felipe',
        `surname` = 'tavera',
        `phone` = 123;

/*---------------------------------------------------------------------*/

/*---DELETE USER:---*/

DELETE user_logued_inf.*, login_user.* 
FROM `user_logued_info` user_logued_inf
inner join `login` login_user on user_logued_inf.id_login_user = login_user.id_login_user 
WHERE user_logued_inf.id_login_user = 4

/*---------------------------------------------------------------------*/

/*---UPDATE USER:---*/

SET foreign_key_checks = 0;
UPDATE `login` 
SET `id_login_user`= 4,
	`user`= 'reader',
   	`pass`= '123456'
WHERE `id_login_user`= 4;
UPDATE `user_logued_info` 
SET `id_login_user`= 4,
	`name`= 'reader',
    `surname`= '123456',
    `phone`= 0025
WHERE `id_login_user`= 4;
SET foreign_key_checks = 1;