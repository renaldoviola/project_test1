
CREATE TABLE IF NOT EXISTSestabelecimento (
	id int(6) unsigned auto_increment primary key,
	nome varchar(100),
	endereco varchar(200),
	numero   int(10),     
	cep     varchar(9),  
	bairro   varchar(100),
	cidade   varchar(100),
	estado   varchar(100),
	telefone varchar(15) 
);
