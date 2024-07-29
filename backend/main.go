package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/swaggo/http-swagger"
	_ "library-management/docs"
	"library-management/config"
	"library-management/routes"
)

// @title Library Management API
// @version 1.0
// @description This is a sample server for a library management system.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /
func main() {
	// Load environment variables
	err := config.LoadEnv()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize the database connection
	client := config.ConnectDB()

	// Initialize the router
	router := mux.NewRouter()

	// Register routes and pass the database client
	routes.RegisterBookRoutes(router, client)

	// Configure CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // Allow your frontend URL
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	// Wrap the router with CORS middleware
	handler := corsHandler.Handler(router)

	// Add Swagger endpoint
	router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	log.Println("Starting server on :8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
