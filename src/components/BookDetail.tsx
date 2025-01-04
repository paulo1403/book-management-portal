import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import bookService, { Book } from "../services/bookService";
import { toast } from "react-toastify";
import Header from "../components/Header";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.token !== null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchBook = async () => {
      if (!id) {
        setError("ID del libro no proporcionado");
        setLoading(false);
        return;
      }

      try {
        const data = await bookService.getBookById(id);
        if (data) {
          setBook(data);
        } else {
          setError("Libro no encontrado");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Error al cargar el libro");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate, isAuthenticated]);

  const handleDelete = async () => {
    if (
      id &&
      window.confirm("¿Estás seguro de que quieres eliminar este libro?")
    ) {
      const success = await bookService.deleteBook(id);
      if (success) {
        toast.success("Libro eliminado exitosamente");
        navigate("/books");
      } else {
        toast.error("Error al eliminar el libro");
      }
    }
  };

  if (loading)
    return (
      <div>
        <Header />
        <div className="max-w-2xl mx-auto p-6">
          <p className="text-center text-gray-600">Cargando...</p>
        </div>
      </div>
    );

  if (error || !book)
    return (
      <div>
        <Header />
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white shadow-md rounded p-6">
            <p className="text-red-600 text-center">
              {error || "Libro no encontrado"}
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate("/books")}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Volver a la lista
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <button
            onClick={() => navigate("/books")}
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
              onClick={() => navigate(`/books/edit/${book.id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
