import axiosInstance from "./axiosConfig";

export interface Book {
  id: string;
  title: string;
  author: string;
  published_date: string;
  genre: string;
  price: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface CreateBookDTO {
  title: string;
  author: string;
  published_date: string;
  genre: string;
  price: number;
  description?: string;
}

class BookService {
  async getBooks(): Promise<Book[]> {
    try {
      console.log(
        "Fetching books from:",
        `${axiosInstance.defaults.baseURL}/books/`
      );
      const response = await axiosInstance.get("/books/");
      console.log("Books response:", response.data);
      if (!Array.isArray(response.data)) {
        console.error("La respuesta no es un array:", response.data);
        return [];
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  }

  async getBookById(id: string): Promise<Book | null> {
    try {
      const response = await axiosInstance.get(`/books/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching book:", error);
      return null;
    }
  }

  async createBook(book: CreateBookDTO): Promise<Book | null> {
    try {
      const response = await axiosInstance.post("/books/", book);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      return null;
    }
  }

  async updateBook(
    id: string,
    book: Partial<CreateBookDTO>
  ): Promise<Book | null> {
    try {
      const response = await axiosInstance.put(`/books/${id}/`, book);
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      return null;
    }
  }

  async deleteBook(id: string): Promise<boolean> {
    try {
      await axiosInstance.delete(`/books/${id}/`);
      return true;
    } catch (error) {
      console.error("Error deleting book:", error);
      return false;
    }
  }
}

export default new BookService();
