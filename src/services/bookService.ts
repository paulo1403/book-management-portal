import axiosInstance from "./axiosConfig";

export interface Book {
  _id: string;
  title: string;
  author: string;
  published_date: string;
  genre: string;
  price: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

class BookService {
  async getBooks(): Promise<Book[]> {
    try {
      console.log('Fetching books from:', `${axiosInstance.defaults.baseURL}/books/`);
      const response = await axiosInstance.get("/books/");
      console.log('Books response:', response.data);
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
}

export default new BookService();
