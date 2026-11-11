package main

import (
	"log"
	"net/http"
	"os"
	"time"

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
func createRouter() http.Handler {
	// Initialize the router
	router := mux.NewRouter()

	// Register routes and pass the database client
	client := config.ConnectDB()
	routes.RegisterBookRoutes(router, client)

	// Custom route for server status
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		if _, err := w.Write([]byte(`<html><body><h1>Server is running!</h1></body></html>`)); err != nil {
			log.Println("Error writing response:", err)
		}
	})

	// Configure CORS
	frontendURL := os.Getenv("FRONTEND_URL")
	log.Printf("Frontend URL allowed for CORS: %s\n", frontendURL)
	// Browsers only read from this API. Writes come server-to-server from the
	// Next.js app (see routes/auth.go), which CORS does not apply to.
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{frontendURL}, // Allow frontend URL
		AllowedMethods: []string{"GET", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	// Wrap the router with CORS middleware
	handler := corsHandler.Handler(router)

	// Swagger docs map out the whole API, so only serve them outside
	// production. Set APP_ENV=production on the deployed server.
	if os.Getenv("APP_ENV") != "production" {
		router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)
	}

	// Custom 404 handler
	router.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "Custom 404 - Page Not Found", http.StatusNotFound)
	})

	return handler
}

func main() {
	// Load environment variables
	err := config.LoadEnv()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get the port from the environment variable or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Create the router and wrap it with CORS middleware
	handler := createRouter()

	// Start the server
	log.Printf("Server is running and listening on port %s...\n", port)
	// Timeouts stop slow or stalled clients from holding connections open
	// forever (Slowloris). Plain http.ListenAndServe has none.
	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           handler,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      20 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}
}
