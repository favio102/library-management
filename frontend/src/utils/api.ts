import axios from "axios";

const API_URL = "http://localhost:8080";

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    console.log("Fetched books: ", response.data);
    return response.data;
  } catch (error) {
    console.error("error fetching books: ", error);
    throw error;
  }
};

export const fetchBook = async (id: string) => {
  const response = await axios.get(`${API_URL}/books/${id}`);
  return response.data;
};

export const createBook = async (book: {
  title: string;
  author: string;
  year: string;
}) => {
  const response = await axios.post(`${API_URL}/books`, book);
  return response.data;
};

export const updateBook = async (
  id: string,
  book: { title: string; author: string; year: string }
) => {
  const response = await axios.put(`${API_URL}/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: string) => {
  const response = await axios.delete(`${API_URL}/books/${id}`);
  return response.data;
};
