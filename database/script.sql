create database db_lista_tarefas_gary_v2;

use db_lista_tarefas_gary_v2;

create table tbl_tarefas
(
	id integer primary key auto_increment not null,
    titulo varchar(50) not null,
    descricao text not null,
    concluido boolean not null,
    usuario_id integer not null,
    
    foreign key (usuario_id) references tbl_usuarios(id)
);

create table tbl_usuarios
(
	id integer primary key auto_increment not null,
    nome varchar(100) not null,
    email varchar(50) not null,
    senha varchar(10) not null,
    premium boolean not null
);

create table tbl_likes
(
	id integer primary key auto_increment not null,
    curtida boolean not null,
    tarefa_id integer not null,
    usuario_id integer not null,
    
    foreign key (tarefa_id) references tbl_tarefas(id),
    foreign key (usuario_id) references tbl_usuarios(id)
);

-- modify: mudar tipo do dado
alter table tbl_likes
modify qt_curtida boolean;

create table tbl_comentarios
(
	id integer primary key auto_increment not null,
    comentario varchar(180) not null,
    tarefa_id integer not null,
    usuario_id integer not null,
    
    foreign key (tarefa_id) references tbl_tarefas(id),
    foreign key (usuario_id) references tbl_usuarios(id)
);

-- comando para adicionar chave estrangeira a uma columa da tabela --
alter table tbl_comentarios
add constraint usuario_id foreign key (usuario_id) references tbl_usuarios(id);

alter table tbl_usuarios
add column premium boolean not null;

alter table tbl_tarefas
add column private boolean not null;

alter table tbl_likes
rename column qt_curtida to curtida;

update tbl_usuarios set premium = true where id=1;

insert into tbl_usuarios (nome, email, senha)values
("Ryan Alves", "ryan@email.com", "123"),
("Gabriela Fernandes", "gab@email.com", "456");

insert into tbl_likes (
							curtida,
							tarefa_id,
							usuario_id
						) values (
							true,
							1,
                            1
						);
                        
insert into tbl_likes (
							curtida,
							tarefa_id,
							usuario_id
						) values (
							true,
							2,
                            1
						);














--  Pesquisas  --


-- Usuário --

-- Selecionar todos os usuários
select * from tbl_usuarios;

-- Selecionar id de um usuário pelo email
select id from tbl_usuarios where email = "ryan@email.com";

-- Selecionar usuário por id
select * from tbl_usuarios where id = 2;

-- Selecionar o tipo de conta
select premium from tbl_usuarios where id = 1;

-- Criar usuário
insert into tbl_usuarios (nome, email, senha, premium)values
("Arthur Lopes", "arthur@email.com", "789", true);

-- Atualizar usuário
update tbl_usuarios set nome='Arthur Lopes', email='arthur@email.com', senha='gabriela' where id=3;

-- Conta premium
update tbl_usuarios set premium = true where id=2;

-- Tirar premium
update tbl_usuarios set premium = false where id=1;



-- Tarefas --

-- Selecionar todas as tarefas privadas de um usuário
select * from tbl_tarefas
inner join tbl_usuarios on tbl_tarefas.usuario_id=tbl_usuarios.id
where private = true 
AND usuario_id = 1;

-- Listar todas as tarefas públicas
select * from tbl_tarefas where private = false;

-- Listar tarefas que um usuário deu LIKE
select tbl_tarefas.id from tbl_tarefas 
inner join tbl_likes 
on tbl_tarefas.id=tbl_likes.tarefa_id
where tbl_likes.curtida = true and tbl_likes.usuario_id = 2;

-- Listar comentários de uma tarefa
select * from tbl_comentarios where tarefa_id=1;

-- Selecionar uma tarefa
select * from tbl_tarefas where id = 1 and usuario_id = 1;

-- Quantidade de likes
 select sum(curtida) from tbl_likes where tarefa_id = 1;

-- Inserir tarefa
insert into tbl_tarefas (
titulo,
descricao,
concluido,
private,
usuario_id
) values (
"Fazer compras",
"Ir no mercado e comprar sorvete",
false,
false,
1
);
                        
-- Inserir comentário
insert into tbl_comentarios (
comentario,
tarefa_id,
usuario_id
) values (
"Ameii!!",
1,
2
);
                            
-- Dar like
insert into tbl_likes (
curtida, 
tarefa_id,
usuario_id
) values (
1,
1,
2
);
                        
-- Deletar tarefa
delete from tbl_tarefas where id = 2 and usuario_id = 1;

-- Deletar comentário
delete from tbl_comentarios where id = 1;

-- Tirar Like
delete from tbl_likes where usuario_id = 1;

-- Alterar tarefa 
update tbl_tarefas set 
titulo = "Fazer compras",	
descricao = "Ir no mercado e comprar chocolate"
where id = 1 and usuario_id = 1;

-- Privar tarefa
update tbl_tarefas set
private = true where id=1;

-- Desprivar tarefa
update tbl_tarefas set
private = false where id=1;

-- Concluir tarefa
update tbl_tarefas set concluido = true where id = 1 and usuario_id = 1;

-- Não concluir tarefa
update tbl_tarefas set concluido = false where id = 1 and usuario_id = 1;




                        
                        
