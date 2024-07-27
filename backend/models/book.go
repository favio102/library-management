package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Book struct {
    ID     primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
    Title       string `json:"title,omitempty"`
    Author      string `json:"author,omitempty"`
    Description string `json:"description,omitempty"`
    Year        string `json:"year,omitempty"`
    Edition     string `json:"edition,omitempty"`
    Language    string `json:"language,omitempty"`
    Subject     string `json:"subject,omitempty"`
    Publisher   string `json:"publisher,omitempty"`
    Format      string `json:"format,omitempty"`
}
