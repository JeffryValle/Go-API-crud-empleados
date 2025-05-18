package routes

import (
	"Go-CRUD/handlers"

	"github.com/labstack/echo/v4"
)

func Rutas(r *echo.Echo) {

	r.GET("/empleados", handlers.GetEmpleados)
	r.POST("/empleados", handlers.CrearEmpleado)
	r.PUT("/empleados/:identidad", handlers.UpdateEmpleado)
	r.DELETE("/empleados/:identidad", handlers.DeleteEmpleado)

	r.GET("/areas", handlers.GetAreas)
	r.GET("/areas/:id", handlers.GetAreaById)

}
