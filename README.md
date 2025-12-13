# Library Management System

A full-stack library management application for managing and organizing book collections with a modern web interface and RESTful API backend.

## Overview

The Library Management System is a comprehensive full-stack application that enables users to manage a collection of books through an intuitive web interface. The system consists of three main components:

- **Frontend**: A modern, responsive Next.js 14 application with TypeScript and Tailwind CSS
- **Backend**: A robust RESTful API built with Go, featuring Swagger documentation
- **URL Service**: A utility service for URL cleanup and redirection operations

### Key Features

- 📚 **Complete CRUD Operations**: Create, read, update, and delete books
- 🔍 **Search & Filter**: Search books by title, author, or subject
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🌓 **Dark Mode**: Theme switching support with next-themes
- 📖 **Rich Book Details**: Track title, author, description, year, edition, language, subject, publisher, and format
- 📸 **Image Upload**: Upload and manage book cover images with drag-and-drop
- 🔗 **RESTful API**: Well-documented API with Swagger/OpenAPI specification
- 🗄️ **MongoDB Storage**: Scalable NoSQL database for book data
- ⚡ **Real-time Updates**: Context API for state management

## Tech Stack

### Frontend
- **Framework**: Next.js 14.2.5
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: @headlessui/react 2.1.2
- **Icons**: react-icons 4.10.1
- **File Upload**: react-dropzone 14.2.3
- **Notifications**: react-hot-toast 2.4.1
- **Theme**: next-themes 0.2.1

### Backend
- **Language**: Go 1.22.5
- **Web Framework**: Gorilla Mux 1.8.1
- **Database**: MongoDB with mongo-driver 1.16.0
- **CORS**: rs/cors 1.11.0
- **Environment**: godotenv 1.5.1
- **API Documentation**: Swagger 1.16.3 with http-swagger 1.3.4

### URL Service
- **Language**: Go 1.22.5
- **API Documentation**: Swagger 1.16.3 with http-swagger 1.3.4

## Project Structure

```
library-management/
├── frontend/               # Next.js frontend application
│   ├── app/               # Next.js app directory (pages and layouts)
│   │   ├── Books/        # Book detail pages
│   │   ├── layout.tsx    # Root layout component
│   │   └── page.tsx      # Home page
│   ├── components/        # Reusable React components
│   │   ├── BookCard.tsx           # Book card display
│   │   ├── BookDetails.tsx        # Book details modal
│   │   ├── Form.tsx               # Book form (add/edit)
│   │   ├── Hero.tsx               # Hero section
│   │   ├── Navbar.tsx             # Navigation bar
│   │   ├── SearchBar.tsx          # Search functionality
│   │   ├── ImageUploader.tsx      # Image upload component
│   │   └── ...
│   ├── context/           # React Context for state management
│   │   └── BookContext.tsx        # Book state management
│   ├── utils/             # Utility functions
│   │   └── api.ts                 # API client functions
│   ├── types/             # TypeScript type definitions
│   ├── constants/         # Application constants
│   ├── public/            # Static assets
│   └── package.json
│
├── backend/               # Go backend API
│   ├── config/            # Configuration management
│   │   └── config.go              # DB connection and env loading
│   ├── controllers/       # HTTP request handlers
│   │   └── bookController.go      # Book CRUD operations
│   ├── models/            # Data models
│   │   └── book.go                # Book model definition
│   ├── routes/            # API route definitions
│   │   └── routes.go              # Route registration
│   ├── docs/              # Swagger documentation
│   ├── main.go            # Application entry point
│   ├── main_test.go       # Main tests
│   └── go.mod
│
└── url-service/           # URL cleanup service
    ├── handlers/          # HTTP handlers
    │   ├── url_handler.go
    │   └── url_handler_test.go
    ├── utils/             # URL processing utilities
    │   ├── url_utils.go
    │   └── url_utils_test.go
    ├── docs/              # Swagger documentation
    ├── main.go            # Service entry point
    └── go.mod
```

## Installation

### Prerequisites

- **Node.js** (v18 or later)
- **Go** (v1.22.5 or later)
- **MongoDB** (Atlas or local instance)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install Go dependencies:**
   ```bash
   go mod tidy
   ```

3. **Create a `.env` file** in the `backend` directory:
   ```env
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   FRONTEND_URL=http://localhost:3000
   PORT=8080
   ```

4. **Generate Swagger documentation** (if modified):
   ```bash
   swag init
   ```

5. **Run the backend server:**
   ```bash
   go run main.go
   ```
   The server will start at `http://localhost:8080`

6. **Run backend tests:**
   ```bash
   go test ./...
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

### URL Service Setup

1. **Navigate to the url-service directory:**
   ```bash
   cd url-service
   ```

2. **Install Go dependencies:**
   ```bash
   go mod tidy
   ```

3. **Generate Swagger documentation** (if modified):
   ```bash
   swag init
   ```

4. **Run the service:**
   ```bash
   go run main.go
   ```
   The service will start at `http://localhost:8080`

5. **Run tests:**
   ```bash
   go test ./...
   ```

## API Documentation

### Backend API Endpoints

The backend provides a RESTful API for managing books:

#### Base URL
```
http://localhost:8080
```

#### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/books` | Get all books |
| `GET` | `/books/{id}` | Get a specific book by ID |
| `POST` | `/books` | Create a new book |
| `PUT` | `/books/{id}` | Update an existing book |
| `DELETE` | `/books/{id}` | Delete a book |

#### Book Model

```json
{
  "id": "string (MongoDB ObjectID)",
  "title": "string",
  "author": "string",
  "description": "string",
  "year": "string",
  "edition": "string",
  "language": "string",
  "subject": "string",
  "publisher": "string",
  "format": "string"
}
```

#### Example Requests

**Get all books:**
```bash
curl -X GET http://localhost:8080/books
```

**Create a new book:**
```bash
curl -X POST http://localhost:8080/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic novel of the Jazz Age",
    "year": "1925",
    "edition": "First Edition",
    "language": "English",
    "subject": "Fiction",
    "publisher": "Scribner",
    "format": "Hardcover"
  }'
```

**Update a book:**
```bash
curl -X PUT http://localhost:8080/books/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "author": "F. Scott Fitzgerald"
  }'
```

**Delete a book:**
```bash
curl -X DELETE http://localhost:8080/books/{id}
```

### Swagger Documentation

Interactive API documentation is available at:
- **Backend API**: `http://localhost:8080/swagger/index.html`
- **URL Service**: `http://localhost:8080/swagger/index.html`

The Swagger UI allows you to:
- View all available endpoints
- See request/response schemas
- Test API calls directly from the browser
- Download OpenAPI specifications

### URL Service API

**POST /process-url** - Process and clean URLs

Request:
```json
{
  "url": "https://EXAMPLE.com/PATH?query=abc/",
  "operation": "all"
}
```

Response:
```json
{
  "processed_url": "https://www.example.com/path"
}
```

Operations: `canonical`, `all`

## Configuration

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `PORT` | Server port (optional) | `8080` (default) |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:8080` |

## Usage Examples

### Using the Frontend Application

1. **Browse Books**: The home page displays all books in a grid layout
2. **Search Books**: Use the search bar to filter books by title, author, or subject
3. **Add a Book**: Click "Add Book" button to open the form modal
4. **Edit a Book**: Click on a book card, then click "Edit" in the details modal
5. **Delete a Book**: Open book details and click "Delete"
6. **Upload Cover**: Drag and drop images in the image uploader component
7. **Toggle Theme**: Use the theme switcher for dark/light mode

### Using the API Programmatically

**JavaScript/TypeScript:**
```typescript
// Fetch all books
const response = await fetch('http://localhost:8080/books');
const books = await response.json();

// Create a new book
const newBook = await fetch('http://localhost:8080/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Book Title',
    author: 'Author Name',
    // ... other fields
  })
});
```

**Go:**
```go
import (
    "bytes"
    "encoding/json"
    "net/http"
)

// Create a book
book := map[string]string{
    "title": "Book Title",
    "author": "Author Name",
}
jsonData, _ := json.Marshal(book)
resp, _ := http.Post(
    "http://localhost:8080/books",
    "application/json",
    bytes.NewBuffer(jsonData),
)
```

## Testing

### Backend Tests

```bash
cd backend
go test ./...
```

Tests include:
- Controller unit tests
- API endpoint tests
- Validation tests

### URL Service Tests

```bash
cd url-service
go test ./...
```

Tests include:
- URL processing logic
- Handler tests
- Utility function tests

## Development

### Running in Development Mode

1. **Start MongoDB** (if running locally)
2. **Start Backend**: `cd backend && go run main.go`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Access Application**: `http://localhost:3000`

### Linting

**Frontend:**
```bash
cd frontend
npm run lint
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
go build -o library-management
./library-management
```

## Additional Notes

- Ensure MongoDB is running and accessible before starting the backend
- The backend uses MongoDB's `library` database and `books` collection
- CORS is configured to allow requests from the frontend URL specified in environment variables
- All API responses use JSON format
- Book IDs are MongoDB ObjectIDs in hexadecimal format
- The frontend uses Context API for global state management
- Images are handled client-side; consider implementing a proper image storage solution for production

## Screenshots

For visual examples of the application, please refer to:
- [Frontend README](./frontend/README.md) for UI screenshots
- [Backend README](./backend/README.md) for API documentation screenshots
- [URL Service README](./url-service/README.md) for service screenshots

## Contributing

For issues or feature requests, please refer to the project's GitHub repository.

## License

This project is available for educational and personal use.
