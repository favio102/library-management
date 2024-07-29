package main

import (
    "log"
    "net/http"

    _ "url-cleanup/docs"
    "url-cleanup/handlers"

    httpSwagger "github.com/swaggo/http-swagger"
)

// @title URL Cleanup and Redirection Service
// @version 1.0
// @description This is a service to clean and redirect URLs.

// @host localhost:8080
// @BasePath /

func main() {
    http.HandleFunc("/process-url", handlers.ProcessURL)
    http.HandleFunc("/swagger/", httpSwagger.WrapHandler)

    log.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatalf("Could not start server: %s\n", err.Error())
    }
}
