package handler

import (
  "fmt"
  "log"
  "net/http"
  "os"

  "github.com/gorilla/mux"
  "github.com/rs/cors"
  "library-management/config"
  "library-management/routes"
)

func Handler(w http.ResponseWriter, r *http.Request) {
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

  // Custom route for server status
  router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/html; charset=utf-8")
    w.WriteHeader(http.StatusOK)
    w.Write([]byte(`<html><body><h1>Server is running!</h1></body></html>`))
  })

  // Configure CORS
  corsHandler := cors.New(cors.Options{
    AllowedOrigins: []string{frontendURL}, // Allow frontend URL
    AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowedHeaders: []string{"Content-Type"},
  })

  // Wrap the router with CORS middleware
  handler := corsHandler.Handler(router)

  // Serve HTTP requests using the router
  handler.ServeHTTP(w, r)
}
