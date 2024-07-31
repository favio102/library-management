package config

import (
	"context"
	"fmt"
	"log"
	"time"
	"os"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func LoadEnv() error {
	err := godotenv.Load()
	if err != nil {
		return err
	}
	return nil
}

func ConnectDB() *mongo.Client {
	connectionString := os.Getenv("MONGODB_URL")
	if connectionString == "" {
		log.Fatal("MONGODB_URL is not set in the environment variables")
	}

	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB Atlas!")
	Client = client
	return client
}
