import axiosInstance from "./axiosConfig";

interface Book {
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

interface IBookStats {
  year: number;
  average_price: number;
  minimum_price: number;
  maximum_price: number;
  total_books: number;
}

class BookService {
  async getBooks(): Promise<Book[]> {
    try {
      const response = await axiosInstance.get("/books/");
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

  async getBookStatsByYear(year: number): Promise<IBookStats | null> {
    try {
      const response = await axiosInstance.get(`/books/stats/year/${year}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book stats:', error);
      return null;
    }
  }
}

const bookService = new BookService();
export type { Book, IBookStats };
export { bookService as default };
