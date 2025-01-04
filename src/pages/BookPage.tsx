import { useState, useEffect } from "react";
import Header from "../components/Header";
import bookService, { Book } from "../services/bookService";
import { Link } from 'react-router-dom';

const BookPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getBooks();
        console.log('Datos recibidos:', data); // Para debuggear
        setBooks(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError('Error al cargar los libros');
        console.error(err);
        setBooks([]); // Asegurar que books siempre sea un array
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Libros</h1>
          <Link
            to="/books/create"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar Nuevo Libro
          </Link>
        </div>
        {loading && <p className="text-gray-600">Cargando libros...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && books.length === 0 && (
          <p className="text-gray-600">No hay libros disponibles</p>
        )}
        {!loading && !error && books.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publicado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books?.map((book) => (
                <tr key={book._id || `book-${book.title}-${book.author}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/books/${book._id}`} className="text-blue-600 hover:text-blue-800">
                      {book.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(book.published_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${book.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookPage;
