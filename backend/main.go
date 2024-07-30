package main

import (
	"log"
	"net/http"
	"os"

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

	// Get the frontend URL from environment variable
	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		log.Fatal("FRONTEND_URL environment variable not set")
	}

	// Get the port from the environment variable or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port for local development
	}

	// Initialize the database connection
	client := config.ConnectDB()

	// Initialize the router
	router := mux.NewRouter()

	// Register routes and pass the database client
	routes.RegisterBookRoutes(router, client)

	// Configure CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{frontendURL}, // Allow frontend URL
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	// Wrap the router with CORS middleware
	handler := corsHandler.Handler(router)

	// Add Swagger endpoint
	router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	// Start the server
	log.Printf("Starting server on :%s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
