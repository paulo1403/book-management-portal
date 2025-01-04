import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookForm from '../components/BookForm';
import bookService from '../services/bookService';
import Header from '../components/Header';

const CreateBook = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const result = await bookService.createBook(values);
      if (result) {
        toast.success('¡Libro creado exitosamente!', {
          position: "top-right",
          autoClose: 3000,
        });
        navigate('/books');
      } else {
        toast.error('Error al crear el libro');
      }
    } catch (error) {
      console.error('Error creating book:', error);
      toast.error('Error al crear el libro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Crear Nuevo Libro</h1>
          <button
            onClick={() => navigate('/books')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Volver
          </button>
        </div>
        <BookForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CreateBook;
