package handlers

import (
	"Go-CRUD/db"
	"Go-CRUD/models"
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetEmpleados(c echo.Context) error {

	db.Init()
	defer db.CloseConnection()

	rows, err := db.DB.Query("call spGetEmpleados();")
	if err != nil {
		log.Println("Error al obtener los empleados:", err)
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Error al obtener los empleados"})
	}

	var e []models.Empleado
	for rows.Next() {
		var emp models.Empleado
		err := rows.Scan(&emp.ID, &emp.Nombre, &emp.Edad,
			&emp.Genero, &emp.EstadoCivil, &emp.Correo, &emp.Cargo,
			&emp.Area, &emp.FechaIngreso,
		)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Error al escanear los empleados"})
		}
		e = append(e, emp)
	}

	return c.JSON(http.StatusOK, e)
}

func GetAreas(c echo.Context) error {
	db.Init()
	defer db.CloseConnection()

	rows, err := db.DB.Query("call spGetAreas();")
	if err != nil {
		return c.JSON(500, echo.Map{"error": "Error al obtener las areas"})
	}
	var a []models.Area
	for rows.Next() {
		var area models.Area
		err := rows.Scan(&area.ID, &area.Nombre)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Error al escanear las areas"})
		}
		a = append(a, area)
	}

	return c.JSON(http.StatusOK, a)
}

func CrearEmpleado(c echo.Context) error {
	db.Init()
	defer db.CloseConnection()

	var e models.Empleado
	if err := c.Bind(&e); err != nil {
		log.Println("Error al enlazar los datos:", err)
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Error al enlazar los datos"})
	}

	row, err := db.DB.Query("call spInsertarEmpleado(?,?,?,?,?,?,?,?);",
		e.ID, e.Nombre, e.Edad, e.Genero, e.EstadoCivil,
		e.Correo, e.Cargo, e.Area,
	)
	fmt.Println("row", row)
	if err != nil {
		log.Println("Error al insertar el empleado:", err)
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Error al insertar el empleado"})
	}

	return c.JSON(http.StatusOK, echo.Map{"message": "Empleado creado exitosamente"})
}

func GetAreaById(c echo.Context) error {

	db.Init()
	defer db.CloseConnection()

	areaId := c.Param("id")
	var area models.Area

	row := db.DB.QueryRow("call spGetAreaById(?)", areaId)
	err := row.Scan(&area.ID, &area.Nombre)
	if err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Área no encontrada"})
	}
	return c.JSON(http.StatusOK, area)
}

func UpdateEmpleado(c echo.Context) error {

	identidad := c.Param("identidad")
	var emp models.Empleado
	if err := c.Bind(&emp); err != nil {
		log.Println("Error al enlazar los datos:", err)
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Datos inválidos"})
	}
	log.Println("Datos del empleado:", emp)

	db.Init()
	defer db.CloseConnection()

	_, err := db.DB.Exec(
		"CALL spUpdateEmpleado(?, ?, ?, ?, ?, ?, ?, ?)",
		identidad, emp.Nombre, emp.Edad, emp.Genero, emp.EstadoCivil,
		emp.Correo, emp.Cargo, emp.Area,
	)
	if err != nil {
		log.Println("Error al actualizar el empleado:", err)
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Error al actualizar el empleado"})
	}

	return c.JSON(http.StatusOK, echo.Map{"message": "Empleado actualizado correctamente"})
}

func DeleteEmpleado(c echo.Context) error {
	identidad := c.Param("identidad")
	db.Init()
	defer db.CloseConnection()

	_, err := db.DB.Exec("call spDeleteEmpleado(?)", identidad)
	if err != nil {
		log.Println("Error al eliminar el empleado:", err)
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Error al eliminar el empleado"})
	}
	log.Println("Empleado eliminado:", identidad)
	return c.JSON(http.StatusOK, echo.Map{"message": "Empleado eliminado correctamente"})
}
