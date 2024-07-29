package controllers

import (
    "context"
    "encoding/json"
    "net/http"
    "time"

    "github.com/gorilla/mux"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "library-management/models"
    "log"
)

// BookController struct
type BookController struct {
    bookCollection *mongo.Collection
}

// NewBookController creates a new BookController
func NewBookController(client *mongo.Client) *BookController {
    bookCollection := client.Database("library").Collection("books")
    return &BookController{bookCollection}
}

// validateBook validates the book fields
func validateBook(book *models.Book) error {
    if book.Title == "" {
        return fmt.Errorf("title cannot be empty")
    }
    // Add more validation rules as needed
    return nil
}

// GetBooks retrieves all books
func (bc *BookController) GetBooks(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    var books []models.Book
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    cursor, err := bc.bookCollection.Find(ctx, bson.M{})
    if err != nil {
        log.Println("Error fetching books:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer cursor.Close(ctx)

    for cursor.Next(ctx) {
        var book models.Book
        if err = cursor.Decode(&book); err != nil {
            log.Println("Error decoding book:", err)
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        books = append(books, book)
    }

    if err := cursor.Err(); err != nil {
        log.Println("Cursor error:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(books)
}

// GetBook retrieves a single book by ID
func (bc *BookController) GetBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)

    objID, err := primitive.ObjectIDFromHex(params["id"])
    if err != nil {
        log.Println("Invalid book ID:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    var book models.Book
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    err = bc.bookCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&book)
    if err != nil {
        log.Println("Error fetching book:", err)
        http.NotFound(w, r)
        return
    }

    json.NewEncoder(w).Encode(book)
}

// CreateBook creates a new book with a unique ID
func (bc *BookController) CreateBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    var book models.Book
    err := json.NewDecoder(r.Body).Decode(&book)
    if err != nil {
        log.Println("Error decoding request body:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Validate book fields
    if err := validateBook(&book); err != nil {
        log.Println("Validation error:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    book.ID = primitive.NewObjectID()
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    _, err = bc.bookCollection.InsertOne(ctx, book)
    if err != nil {
        log.Println("Error inserting book:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(book)
}

// UpdateBook updates an existing book by ID
func (bc *BookController) UpdateBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)

    objID, err := primitive.ObjectIDFromHex(params["id"])
    if err != nil {
        log.Println("Invalid book ID:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    var book models.Book
    err = json.NewDecoder(r.Body).Decode(&book)
    if err != nil {
        log.Println("Error decoding request body:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Validate book fields
    if err := validateBook(&book); err != nil {
        log.Println("Validation error:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    update := bson.M{
        "$set": book,
    }

    _, err = bc.bookCollection.UpdateOne(ctx, bson.M{"_id": objID}, update)
    if err != nil {
        log.Println("Error updating book:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(book)
}

// DeleteBook deletes a book by ID
func (bc *BookController) DeleteBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)

    objID, err := primitive.ObjectIDFromHex(params["id"])
    if err != nil {
        log.Println("Invalid book ID:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    _, err = bc.bookCollection.DeleteOne(ctx, bson.M{"_id": objID})
    if err != nil {
        log.Println("Error deleting book:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode("Book deleted")
}
