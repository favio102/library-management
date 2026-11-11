package routes

import (
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"library-management/controllers"
)

func RegisterBookRoutes(router *mux.Router, client *mongo.Client) {
	bookController := controllers.NewBookController(client)
	router.HandleFunc("/books", bookController.GetBooks).Methods("GET")
	router.HandleFunc("/books/{id}", bookController.GetBook).Methods("GET")
	router.HandleFunc("/books", requireWriteKey(bookController.CreateBook)).Methods("POST")
	router.HandleFunc("/books/{id}", requireWriteKey(bookController.UpdateBook)).Methods("PUT")
	router.HandleFunc("/books/{id}", requireWriteKey(bookController.DeleteBook)).Methods("DELETE")
}
