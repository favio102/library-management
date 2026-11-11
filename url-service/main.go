package main

import (
    "log"
    "net/http"
    "time"

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
    srv := &http.Server{
        Addr:              ":8080",
        ReadHeaderTimeout: 5 * time.Second,
        ReadTimeout:       10 * time.Second,
        WriteTimeout:      10 * time.Second,
        IdleTimeout:       60 * time.Second,
    }
    if err := srv.ListenAndServe(); err != nil {
        log.Fatalf("Could not start server: %s\n", err.Error())
    }
}
