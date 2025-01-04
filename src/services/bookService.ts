import axios from 'axios';

const API_URL = "http://localhost:8000/api";

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
      const response = await axios.get(`${API_URL}/books/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
}

export default new BookService();
