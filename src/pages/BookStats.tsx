import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../store/authStore";
import bookService from "../services/bookService";
import type { IBookStats } from "../services/bookService";
import Header from "../components/Header";
import { toast } from "react-toastify";

const BookStats = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.token !== null);
  const currentYear = new Date().getFullYear();
  const [stats, setStats] = useState<IBookStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const formik = useFormik({
    initialValues: {
      year: currentYear,
    },
    validationSchema: Yup.object({
      year: Yup.number()
        .required("El año es requerido")
        .min(1900, "El año debe ser mayor a 1900")
        .max(currentYear, "No puedes seleccionar un año futuro")
        .integer("El año debe ser un número entero"),
    }),
    onSubmit: async (values) => {
      fetchStats(values.year);
    },
  });

  const fetchStats = async (selectedYear: number) => {
    setLoading(true);
    try {
      const data = await bookService.getBookStatsByYear(selectedYear);
      if (data === null && !initialLoad) {
        toast.info(`No hay datos disponibles para el año ${selectedYear}`);
      }
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
      if (!initialLoad) {
        toast.error(`Error al cargar las estadísticas del año ${selectedYear}`);
      }
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (initialLoad) {
      fetchStats(currentYear);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/books")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              ← Regresar
            </button>
            <h1 className="text-2xl font-bold">
              Estadísticas de Libros {formik.values.year}
            </h1>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex gap-4 items-center"
          >
            <div>
              <label htmlFor="year" className="text-gray-700 mr-2">
                Año:
              </label>
              <input
                type="text"
                id="year"
                {...formik.getFieldProps("year")}
                className={`border rounded px-3 py-1 w-24 ${
                  formik.touched.year && formik.errors.year
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.year && formik.errors.year && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.year}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
              disabled={loading || !formik.isValid}
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </form>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando estadísticas...</p>
        ) : stats ? (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">
                  Total de Libros
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.total_books}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">
                  Precio Promedio
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  ${stats.average_price.toFixed(2)}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800">
                  Precio Mínimo
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                  ${stats.minimum_price.toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800">
                  Precio Máximo
                </h3>
                <p className="text-3xl font-bold text-purple-600">
                  ${stats.maximum_price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No hay datos disponibles para este año.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookStats;
