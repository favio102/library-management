package main

import (
    "log"
    "net/http"

    "github.com/gorilla/mux"
    "library-management/routes"
)

func main() {
    router := mux.NewRouter()
    routes.RegisterBookRoutes(router)
    log.Println("Starting server on :8080...")
    log.Fatal(http.ListenAndServe(":8080", router))
}
