package main

import (
    "log"
    "net/http"
    "url-cleanup/handlers"
)

func main() {
    http.HandleFunc("/process-url", handlers.ProcessURL)
    log.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatalf("Could not start server: %s\n", err.Error())
    }
}
