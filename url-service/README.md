# URL Cleanup and Redirection Service

## Overview

This service performs URL cleanup and redirection based on specific rules and operation types. It accepts JSON input containing the original URL and the designated operation type, processes the URL accordingly, and returns the cleaned or redirected URL in JSON format.

## Table of Contents

- Setup Instructions
- Project Structure
- Endpoint Usage
- Running Tests
- Swagger Documentation

## Setup Instructions

### Prerequisites

- Go (version 1.18 or later)
- Swag (for generating Swagger documentation)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/favio102/library-management.git
   cd url-service
   ```

2. Install dependencies:
   ```
   go mod tidy
   ```
3. Install Swag for generating Swagger documentation:
   ```
   go install github.com/swaggo/swag/cmd/swag@latest
   ```
4. Generate Swagger documentation:
   ```
   swag init
   ```

### Running the Server

To start the server, run:

```
go run main.go
```

The server will start on http://localhost:8080.

## Project Structure

```
url-cleanup-service/
├── docs/                       # Swagger documentation files
├── handlers/
│   ├── url_handler.go          # HTTP handler for URL processing
│   ├── url_handler_test.go     # Unit tests for URL handler
├── utils/
│   ├── url_utils.go            # Utility functions for URL processing
│   ├── url_utils_test.go       # Unit tests for utility functions
├── main.go                     # Entry point of the application
├── go.mod                      # Go module file
├── go.sum                      # Go dependencies file
└── README.md                   # Project documentation
```

## Endpoint Usage

POST /process-url

This endpoint processes a URL based on the provided operation type.

#### Request

- URL: /process-url
- Method: POST
- Content-Type: application/json
- Body:

```
{
  "url": "https://BYFOOD.com/food-EXPeriences?query=abc/",
  "operation": "all"
}
```

#### Response

- Success (HTTP 200):
  ```
  {
  "processed_url": "https://www.byfood.com/food-experiences"
  }
  ```
- Bad Request (HTTP 400):

  ```
  {
  "error": "Invalid request payload"
  }
  ```

- Invalid Operation (HTTP 400):

  ```
  {
  "error": "Invalid operation type"
  }
  ```

  ### Operation Types

  - canonical: Clean up the URL to its canonical form.
  - all: Apply both of the above operations.

## Running Tests

To run the tests, use the following command:

```
go test ./...

```

This will execute all unit tests for the handlers and utility functions.

## Swagger Documentation

Swagger documentation is available at http://localhost:8080/swagger/index.html.

<!-- insert images -->

### Generating Swagger Documentation

If you make changes to the API and need to regenerate the Swagger documentation, run:

```
swag init
```

### Example Requests and Responses

#### Example 1: Operation Type all

Request

```
{
  "url": "https://BYFOOD.com/food-EXPeriences?query=abc/",
  "operation": "all"
}
```

Response

```
{
  "processed_url": "https://www.byfood.com/food-experiences"
}

```

#### Example 2: Operation Type canonical

Request

```
{
  "url": "https://BYFOOD.com/food-EXPeriences?query=abc/",
  "operation": "canonical"
}
```

Response

```
 {
  "processed_url": "https://BYFOOD.com/food-EXPeriences"
 }

```
