use Jeffry;

DROP PROCEDURE IF EXISTS spGetEmpleados;

DELIMITER //
create procedure spGetEmpleados()
begin
    select  
	e.Identidad as Identidad,
    e.Nombre as Nombre,
    e.Edad as Edad,
    e.Genero as Genero,
    e.EstadoCivil as EstadoCivil,
    e.Correo as Correo,
    e.Cargo as Cargo,
    a.Nombre as Area,
    e.FechaIngreso as FechaIngreso
    from Empleados e
    inner join Areas as a on a.AreaID = e.Area;
end //
DELIMITER ;
call spGetEmpleados();

DELIMITER //
create procedure spGetAreas()
begin
    select * from Areas;
end //
DELIMITER ;
call spGetAreas();

select * from Empleados;
DROP PROCEDURE IF EXISTS spInsertarEmpleado;
DELIMITER //
create procedure spInsertarEmpleado(
    in pIdentidad varchar(20),
    in pNombre varchar(255),
    in pEdad int,
    in pGenero varchar(1),
    in pEstadoCivil varchar(1),
    in pCorreo varchar(255),
    in pCargo varchar(255),
    in pArea int
)
begin
    insert into Empleados (
        Identidad, Nombre, Edad, Genero, EstadoCivil, Correo, Cargo, Area
    ) values (
        pIdentidad, pNombre, pEdad, pGenero, pEstadoCivil, pCorreo, pCargo, pArea
    );
end //
DELIMITER ;
call spInsertarEmpleado('0801199901234', 'Carlos Martínez', 30, 'M', 'S', 'carlos.martinez@gmail.com', 'Analista de Sistemas', 3);


DELIMITER //
create procedure spGetAreaById(in pAreaId int)
begin
    select AreaID as id, Nombre as nombre
    from Areas
    where AreaID = pAreaId;
end //
DELIMITER ;

call spGetAreaById(1);

select * from Empleados;
DELIMITER //
create procedure spUpdateEmpleado(
	in pIdentidad varchar(20),
    in pNombre varchar(255),
    in pEdad int,
    in pGenero varchar(1),
    in pEstadoCivil varchar(1),
    in pCorreo varchar(255),
    in pCargo varchar(255),
    in pArea int
)
begin
    UPDATE Empleados
    SET
        Nombre = pNombre,
        Edad = pEdad,
        Genero = pGenero,
        EstadoCivil = pEstadoCivil,
        Correo = pCorreo,
        Cargo = pCargo,
        Area = pArea
    WHERE Identidad = pIdentidad;
end //
DELIMITER ;

DROP PROCEDURE IF EXISTS spDeleteEmpleado;
DELIMITER //
create procedure spDeleteEmpleado(in pIdentidad varchar(20))
begin
    delete from Empleados where Identidad = pIdentidad;
end //
DELIMITER ;


