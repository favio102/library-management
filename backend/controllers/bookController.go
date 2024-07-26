package controllers

import (
    "encoding/json"
    "net/http"
    "github.com/gorilla/mux"
    "github.com/google/uuid"
    "library-management/models"
)

var books []models.Book

// GetBooks retrieves all books
func GetBooks(w http.ResponseWriter, r *http.Request) {
    json.NewEncoder(w).Encode(books)
}

// GetBook retrieves a single book by ID
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

// CreateBook creates a new book with a unique ID
func CreateBook(w http.ResponseWriter, r *http.Request) {
    var book models.Book
    _ = json.NewDecoder(r.Body).Decode(&book)
    
    // Generate a unique ID for the new book
    book.ID = uuid.New().String()
    
    books = append(books, book)
    json.NewEncoder(w).Encode(book)
}

// UpdateBook updates an existing book by ID
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

// DeleteBook deletes a book by ID
func DeleteBook(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    for index, item := range books {
        if item.ID == params["id"] {
            books = append(books[:index], books[index+1:]...)
            json.NewEncoder(w).Encode(books)
            return
        }
    }
    http.NotFound(w, r)
}
