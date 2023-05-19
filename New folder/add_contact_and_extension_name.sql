ALTER TABLE `pup_registrar`.`user` 
ADD COLUMN `contact_number` VARCHAR(45) NULL AFTER `updated_at`,
ADD COLUMN `extension_name` VARCHAR(5) NULL AFTER `contact_number`;

ALTER TABLE `pup_registrar`.`transaction` 
ADD COLUMN `schedule` DATETIME NULL AFTER `user_id`;
