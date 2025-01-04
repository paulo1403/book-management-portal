import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookForm from "../components/BookForm";
import bookService, { Book } from "../services/bookService";
import Header from "../components/Header";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        const data = await bookService.getBookById(id);
        if (data) {
          setBook(data);
        } else {
          toast.error("Libro no encontrado");
          navigate("/books");
        }
      } catch (err) {
        toast.error("Error al cargar el libro");
        navigate("/books");
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleSubmit = async (values: any) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const result = await bookService.updateBook(id, values);
      if (result) {
        toast.success("¡Libro actualizado exitosamente!");
        navigate("/books");
      } else {
        toast.error("Error al actualizar el libro");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Error al actualizar el libro");
    } finally {
      setIsLoading(false);
    }
  };

  if (!book) {
    return (
      <div>
        <Header />
        <div className="max-w-2xl mx-auto p-6">
          <p className="text-center text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Editar Libro: {book.title}</h1>
          <button
            onClick={() => navigate("/books")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
        <BookForm
          initialValues={book}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EditBook;
