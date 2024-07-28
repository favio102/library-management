// api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// console.log("API_BASE_URL:", API_BASE_URL);
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

// Get all books
export const getBooks = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};

// Get a single book by ID
export const getBookById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }
  return response.json();
};

// Create a new book
export const createBook = async (book: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error("Failed to create book");
  }
  return response.json();
};

// Update an existing book
export const updateBook = async (id: string, book: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error("Failed to update book");
  }
  return response.json();
};

// Delete a book by ID
export const deleteBook = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete book");
  }
};
