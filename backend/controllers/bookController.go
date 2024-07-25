package controllers

import (
    "encoding/json"
    "net/http"

    "github.com/gorilla/mux"
    "library-management/models"
)

var books []models.Book

func GetBooks(w http.ResponseWriter, r *http.Request) {
    json.NewEncoder(w).Encode(books)
}

func GetBook(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    for _, item := range books {
        if item.ID == params["id"] {
            json.NewEncoder(w).Encode(item)
            return
        }
    }
    http.NotFound(w, r)
}

func CreateBook(w http.ResponseWriter, r *http.Request) {
    var book models.Book
    _ = json.NewDecoder(r.Body).Decode(&book)
    book.ID = "1" // Mock ID - in real-world use, you'd generate a new ID
    books = append(books, book)
    json.NewEncoder(w).Encode(book)
}

func UpdateBook(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    for index, item := range books {
        if item.ID == params["id"] {
            books = append(books[:index], books[index+1:]...)
            var book models.Book
            _ = json.NewDecoder(r.Body).Decode(&book)
            book.ID = params["id"]
            books = append(books, book)
            json.NewEncoder(w).Encode(book)
            return
        }
    }
    http.NotFound(w, r)
}

func DeleteBook(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    for index, item := range books {
        if item.ID == params["id"] {
            books = append(books[:index], books[index+1:]...)
            break
        }
    }
    json.NewEncoder(w).Encode(books)
}
