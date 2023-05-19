-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pup_registrar` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `pup_registrar` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `middle_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email_address` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_assessment`.`branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`branch` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `code` CHAR(3) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_assessment`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `code` CHAR(10) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_assessment`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `branch_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `student_id` VARCHAR(45) NULL,
  `scholar_status` INT(1) NULL,
  `is_complete` TINYINT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_student_record_branch1_idx` (`branch_id` ASC),
  INDEX `fk_student_record_course1_idx` (`course_id` ASC),
  INDEX `fk_student_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_student_record_branch1`
    FOREIGN KEY (`branch_id`)
    REFERENCES `db_assessment`.`branch` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_record_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `db_assessment`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_assessment`.`transaction_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`transaction_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_assessment`.`transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`transaction` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_transaction_transaction_category1_idx` (`category_id` ASC),
  INDEX `fk_transaction_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_transaction_transaction_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `db_assessment`.`transaction_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_assessment`.`requirement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`requirement` (
  `id` INT NOT NULL,
  `name` VARCHAR(55) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_assessment`.`student_completed_requirement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`student_completed_requirement` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `requirement_id` INT NOT NULL,
  `is_done` TINYINT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_student_completed_requirement_student_record1_idx` (`student_id` ASC),
  INDEX `fk_student_completed_requirement_requirement1_idx` (`requirement_id` ASC),
  CONSTRAINT `fk_student_completed_requirement_student_record1`
    FOREIGN KEY (`student_id`)
    REFERENCES `db_assessment`.`student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_completed_requirement_requirement1`
    FOREIGN KEY (`requirement_id`)
    REFERENCES `db_assessment`.`requirement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_assessment`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_admin_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_admin_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_assessment`.`alumnus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pup_registrar`.`alumnus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `branch_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `student_id` VARCHAR(45) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_alumnus_branch1_idx` (`branch_id` ASC),
  INDEX `fk_alumnus_course1_idx` (`course_id` ASC),
  INDEX `fk_alumnus_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_alumnus_branch1`
    FOREIGN KEY (`branch_id`)
    REFERENCES `db_assessment`.`branch` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_alumnus_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `db_assessment`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_alumnus_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
