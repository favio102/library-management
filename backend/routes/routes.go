package routes

import (
    "github.com/gorilla/mux"
    "library-management/controllers"
)

func RegisterBookRoutes(router *mux.Router) {
    router.HandleFunc("/books", controllers.GetBooks).Methods("GET")
    router.HandleFunc("/books/{id}", controllers.GetBook).Methods("GET")
    router.HandleFunc("/books", controllers.CreateBook).Methods("POST")
    router.HandleFunc("/books/{id}", controllers.UpdateBook).Methods("PUT")
    router.HandleFunc("/books/{id}", controllers.DeleteBook).Methods("DELETE")
}
