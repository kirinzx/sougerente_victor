CREATE TABLE perfil
(
  idperfil serial primary key not null,
  descricao_perfil varchar(45)
)
WITH (
  OIDS=FALSE
);

CREATE TABLE funcao
(
  idfuncao serial primary key not null,  
  descricao_funcao varchar(100),
  supervisao boolean,
  idfuncao_goauditt varchar(100)
)
WITH (
  OIDS=FALSE
);

CREATE TABLE grupo_parceiro
(
  idgrupo_parceiro serial primary key not null,  
  descricao varchar(45)
)
WITH (
  OIDS=FALSE
);


CREATE TABLE parceiro
(
  idparceiro serial primary key not null,  
  apelido_parceiro varchar(45),
  razao_social varchar(200),
  cnpj integer,
  idgrupo_parceiro integer,
  idparceiro_goauditt integer,

  CONSTRAINT idgrupo_parceiro_fkey FOREIGN KEY (idgrupo_parceiro)
      REFERENCES grupo_parceiro (idgrupo_parceiro) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION  
)
WITH (
  OIDS=FALSE
);

CREATE TABLE departamento
(
  iddepartamento serial primary key not null,  
  descricao_departamento varchar(45)
)
WITH (
  OIDS=FALSE
);

CREATE TABLE organograma
(
  idorganograma serial primary key not null,  
  descricao_organograma varchar(100),
  idfuncao integer,
  iddepartamento integer,

  CONSTRAINT idfuncao_fkey FOREIGN KEY (idfuncao)
      REFERENCES funcao (idfuncao) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

  CONSTRAINT iddepartamento_fkey FOREIGN KEY (iddepartamento)
      REFERENCES departamento (iddepartamento) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

CREATE TABLE usuario
(
  idusuario serial primary key not null,  
  cpf integer,
  email varchar(45),
  celular integer,
  idorganograma integer,

  CONSTRAINT idorganograma_fkey FOREIGN KEY (idorganograma)
      REFERENCES organograma (idorganograma) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION  
)
WITH (
  OIDS=FALSE
);

CREATE TABLE usuario_perfil
(
  idusuario_perfil serial primary key not null,  
  idusuario integer,
  idperfil integer,
  idparceiro integer,

  CONSTRAINT idusuario_fkey FOREIGN KEY (idusuario)
      REFERENCES usuario (idusuario) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

  CONSTRAINT idperfil_fkey FOREIGN KEY (idperfil)
      REFERENCES perfil (idperfil) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

  CONSTRAINT idparceiro_fkey FOREIGN KEY (idparceiro)
      REFERENCES parceiro (idparceiro) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION              
)
WITH (
  OIDS=FALSE
);

CREATE TABLE usuario_acesso
(
  idusuario_acesso serial primary key not null,  
  idusuario integer,
  dados boolean,
  tarefas boolean,
  resultado boolean,
  indicadores boolean,

  CONSTRAINT idusuario_fkey FOREIGN KEY (idusuario)
      REFERENCES usuario (idusuario) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION    
)
WITH (
  OIDS=FALSE
);

CREATE TABLE grupo_tarefas
(
  idgrupo_tarefas serial primary key not null,  
  descricao_grupo_tarefas varchar(45)
)
WITH (
  OIDS=FALSE
);


CREATE TABLE definicao_tarefas
(
  iddefinicao_tarefas serial primary key not null,  
  descricao varchar(45), 
  idgrupo_tarefas integer,
  idfuncao integer,
  iddepartamento integer,

  CONSTRAINT idgrupo_tarefas_fkey FOREIGN KEY (idgrupo_tarefas)
      REFERENCES grupo_tarefas (idgrupo_tarefas) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

  CONSTRAINT idfuncao_fkey FOREIGN KEY (idfuncao)
      REFERENCES funcao (idfuncao) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

  CONSTRAINT iddepartamento_fkey FOREIGN KEY (iddepartamento)
      REFERENCES departamento (iddepartamento) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

CREATE TABLE definicao_tarefas_lojas
(
  iddefinicao_tarefas_lojas serial primary key not null,  
  iddefinicao_tarefas integer, 
  idparceiro integer,

  CONSTRAINT iddefinicao_tarefas_fkey FOREIGN KEY (iddefinicao_tarefas)
      REFERENCES definicao_tarefas (iddefinicao_tarefas) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

  CONSTRAINT idparceiro_fkey FOREIGN KEY (idparceiro)
      REFERENCES parceiro (idparceiro) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

CREATE TABLE definicao_tarefas_lojas_usuarios
(
  iddefinicao_tarefas_lojas_usuarios serial primary key not null,  
  iddefinicao_tarefas_lojas integer,
  idusuario  integer,

  CONSTRAINT iddefinicao_tarefas_lojas_fkey FOREIGN KEY (iddefinicao_tarefas_lojas)
      REFERENCES iddefinicao_tarefas_lojas (iddefinicao_tarefas_lojas) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

  CONSTRAINT idusuario_fkey FOREIGN KEY (idusuario)
      REFERENCES usuario (idusuario) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

CREATE TABLE cronograma_tarefas
(
  idcronograma_tarefas serial primary key not null,  
  iddefinicao_tarefas_lojas_usuarios integer,
  status boolean,
  diario boolean,
  semanal boolean,
  quinzenal boolean,
  mensal  boolean,
  anual boolean,
  segunda boolean,
  terca boolean,
  quarta boolean,
  quinta boolean,
  sexta boolean,
  sabado boolean,
  domingo boolean,

  CONSTRAINT iddefinicao_tarefas_lojas_usuarios_fkey FOREIGN KEY (iddefinicao_tarefas_lojas_usuarios)
      REFERENCES definicao_tarefas_lojas_usuarios (iddefinicao_tarefas_lojas_usuarios) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION  
)
WITH (
  OIDS=FALSE
);

CREATE TABLE tarefas_executadas
(
  idtarefas_executadas serial primary key not null,  
  iddefinicao_tarefas integer,
  idusuario integer,
  idparceiro integer,
  dt_inc date DEFAULT ('now'::text)::date,
  hr_inc time(0) without time zone DEFAULT ('now'::text)::time with time zone,

  CONSTRAINT iddefinicao_tarefas_usuarios_fkey FOREIGN KEY (iddefinicao_tarefas)
      REFERENCES definicao_tarefas (iddefinicao_tarefas) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  
  CONSTRAINT idusuario_fkey FOREIGN KEY (idusuario)
      REFERENCES usuario (idusuario) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

  CONSTRAINT idparceiro_fkey FOREIGN KEY (idparceiro)
      REFERENCES parceiro (idparceiro) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION    
)
WITH (
  OIDS=FALSE
);


CREATE TABLE tarefas_observacao
(
  idtarefas_observacao serial primary key not null,  
  idtarefas_executadas integer,
  descricao_observacao varchar(45),
  anexos varchar(45),

  CONSTRAINT idtarefas_executadas_fkey FOREIGN KEY (idtarefas_executadas)
      REFERENCES tarefas_executadas (idtarefas_executadas) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);