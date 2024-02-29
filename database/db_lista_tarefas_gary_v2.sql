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
    senha varchar(10) not null
);

create table tbl_likes
(
	id integer primary key auto_increment not null,
    qt_curtida boolean not null,
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

update tbl_usuarios set premium = true where id=1;

insert into tbl_usuarios (nome, email, senha)values
("Ryan Alves", "ryan@email.com", "123"),
("Gabriela Fernandes", "gab@email.com", "456");

-- Pesquisas --

select * from tbl_usuarios;

select id from tbl_usuarios where email = "ryan@email.com";

update tbl_usuarios set 
					nome='Vitor de Jesus',
                    email='vitor@email.com',
                    senha='seinao' 
			where id=2;

select * from tbl_tarefas where usuario_id = 1;

select * from tbl_tarefas where usuario_id = 1 and concluido = false;

select * from tbl_tarefas where id = 1 and usuario_id = 1;

update tbl_tarefas set concluido = true where id = 1 and usuario_id = 1;

update tbl_tarefas set concluido = false where id = 1 and usuario_id = 1;

update tbl_tarefas set 
					titulo = "Fazer compras",	
                    descricao = "Ir no mercado e comprar chocolate"
					where id = 1 and usuario_id = 1;
        
delete from tbl_tarefas where id = 2 and usuario_id = 1;

insert into tbl_tarefas (
							titulo,
                            descricao,
                            concluido,
                            usuario_id
						) values (
							"Fazer compras",
							"Ir no mercado e comprar sorvete",
							false,
							1
						);
                        
insert into tbl_tarefas (
                            titulo,
                            descricao,
                            concluido,
                            usuario_id
                        ) values (
                            'Fazer compras',
                            'Comprar chocolate',
                            false,
                            1
                        );
                        
select tbl_tarefas.id from tbl_tarefas 
inner join tbl_likes 
on tbl_tarefas.id=tbl_likes.tarefa_id
where tbl_likes;