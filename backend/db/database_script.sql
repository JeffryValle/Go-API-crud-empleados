use Jeffry;

create table Empleados (
	Identidad varchar(20) not null primary key,
    Nombre varchar(255) not null,
    Edad int not null,
    Genero	varchar(1) not null,
    EstadoCivil	varchar(1) not null,
    Correo varchar(255) not null,
    Cargo varchar(255) not null,
    Area int null,
    FechaIngreso datetime not null default current_timestamp,
    foreign key (Area) references Areas(AreaID)
);

ALTER TABLE Empleados
MODIFY FechaIngreso DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;


-- ALTER TABLE Empleados
-- MODIFY COLUMN Cargo varchar(255);

-- ALTER TABLE Empleados
-- MODIFY COLUMN FechaIngreso datetime not null;


create table Areas (
	AreaID int auto_increment primary key not null,
    Nombre varchar(255) not null
);