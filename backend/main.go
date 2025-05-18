package main

import (
	"Go-CRUD/routes"
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	fmt.Println("Iniciando el servidor...")

	// Creamos una nueva instancia de Echo
	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method:${method}, uri=${uri}, status=${status}, time=${latency_human}\n",
	}))

	e.Use(middleware.CORS())
	// Traemos las rutas desde el paquete routes
	// y le pasamos la instancia de Echo
	routes.Rutas(e)

	e.Logger.Fatal(e.Start(":4000"))
}
