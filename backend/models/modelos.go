package models

type Empleado struct {
	ID           string `json:"id"`
	Nombre       string `json:"nombre"`
	Edad         int    `json:"edad"`
	Genero       string `json:"genero"`
	EstadoCivil  string `json:"estado_civil"`
	Correo       string `json:"correo"`
	Cargo        string `json:"cargo"`
	Area         string `json:"area"`
	FechaIngreso string `json:"fecha_ingreso"`
}

type Area struct {
	ID     string `json:"id"`
	Nombre string `json:"nombre"`
}
