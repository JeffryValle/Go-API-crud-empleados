package db

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Init() {
	var err error
	cnx := "user:password@tcp(localhost:3306)/<db_name>"
	DB, err = sql.Open("mysql", cnx)
	if err != nil {
		log.Fatal(err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Conexión exitosa a la base de datos")
}

func CloseConnection() {
	if DB != nil {
		DB.Close()
	}
	log.Println("Conexión cerrada")
}
