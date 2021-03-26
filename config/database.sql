CREATE SCHEMA `nave_node` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `nave_node`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `senha` CHAR(60) NOT NULL,
  PRIMARY KEY (`id_user`));

CREATE TABLE `nave_node`.`navers` (
  `id_naver` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(70) NOT NULL,
  `birthdate` DATE NOT NULL,
  `admission_date` DATE NOT NULL,
  `job_role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_naver`));

CREATE TABLE `nave_node`.`projetos_navers` (
  `id_projeto` INT NOT NULL,
  `id_naver` INT NOT NULL,
  INDEX `id_naver_idx` (`id_naver` ASC) VISIBLE,
  INDEX `id_projeto_idx` (`id_projeto` ASC) VISIBLE,
  CONSTRAINT `id_naver`
    FOREIGN KEY (`id_naver`)
    REFERENCES `nave_node`.`navers` (`id_naver`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_projeto`
    FOREIGN KEY (`id_projeto`)
    REFERENCES `nave_node`.`projetos` (`id_projeto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


