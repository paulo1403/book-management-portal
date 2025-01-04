import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService, { Book } from '../services/bookService';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        const data = await bookService.getBookById(id);
        setBook(data);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (id && window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      const success = await bookService.deleteBook(id);
      if (success) {
        navigate('/books');
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!book) return <div>Libro no encontrado</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{book?.title}</h1>
        <button
          onClick={() => navigate('/books')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Volver a la lista
        </button>
      </div>
      <div className="bg-white shadow-md rounded p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="font-bold">Autor:</div>
          <div>{book.author}</div>
          <div className="font-bold">Género:</div>
          <div>{book.genre}</div>
          <div className="font-bold">Fecha de publicación:</div>
          <div>{new Date(book.published_date).toLocaleDateString()}</div>
          <div className="font-bold">Precio:</div>
          <div>${book.price}</div>
        </div>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate(`/books/edit/${book._id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
          <button
            onClick={() => navigate('/books')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
