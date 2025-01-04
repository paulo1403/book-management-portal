import { useFormik } from "formik";
import * as Yup from "yup";
import { Book } from "../services/bookService";

interface BookFormProps {
  initialValues?: Partial<Book>;
  onSubmit: (values: any) => Promise<void>;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required("El título es requerido"),
  author: Yup.string().required("El autor es requerido"),
  published_date: Yup.date().required("La fecha de publicación es requerida"),
  genre: Yup.string().required("El género es requerido"),
  price: Yup.number()
    .required("El precio es requerido")
    .positive("El precio debe ser positivo"),
  description: Yup.string(),
});

const BookForm = ({ initialValues, onSubmit, isLoading }: BookFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: initialValues?.title || "",
      author: initialValues?.author || "",
      published_date: initialValues?.published_date
        ? new Date(initialValues.published_date).toISOString().split("T")[0]
        : "",
      genre: initialValues?.genre || "",
      price: initialValues?.price || "",
      description: initialValues?.description || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const inputClassName =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out px-3 py-2";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
  const errorClassName = "mt-1 text-sm text-red-600";
  const formGroupClassName = "mb-6";

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className={formGroupClassName}>
          <label htmlFor="title" className={labelClassName}>
            Título
          </label>
          <input
            id="title"
            type="text"
            {...formik.getFieldProps("title")}
            className={inputClassName}
            placeholder="Ingrese el título del libro"
          />
          {formik.touched.title && formik.errors.title && (
            <div className={errorClassName}>{formik.errors.title}</div>
          )}
        </div>

        <div className={formGroupClassName}>
          <label htmlFor="author" className={labelClassName}>
            Autor
          </label>
          <input
            id="author"
            type="text"
            {...formik.getFieldProps("author")}
            className={inputClassName}
            placeholder="Nombre del autor"
          />
          {formik.touched.author && formik.errors.author && (
            <div className={errorClassName}>{formik.errors.author}</div>
          )}
        </div>

        <div className={formGroupClassName}>
          <label htmlFor="published_date" className={labelClassName}>
            Fecha de Publicación
          </label>
          <input
            id="published_date"
            type="date"
            {...formik.getFieldProps("published_date")}
            className={inputClassName}
          />
          {formik.touched.published_date && formik.errors.published_date && (
            <div className={errorClassName}>{formik.errors.published_date}</div>
          )}
        </div>

        <div className={formGroupClassName}>
          <label htmlFor="genre" className={labelClassName}>
            Género
          </label>
          <input
            id="genre"
            type="text"
            {...formik.getFieldProps("genre")}
            className={inputClassName}
            placeholder="Género literario"
          />
          {formik.touched.genre && formik.errors.genre && (
            <div className={errorClassName}>{formik.errors.genre}</div>
          )}
        </div>

        <div className={formGroupClassName}>
          <label htmlFor="price" className={labelClassName}>
            Precio
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              id="price"
              type="number"
              step="0.01"
              {...formik.getFieldProps("price")}
              className={`${inputClassName} pl-7`}
              placeholder="0.00"
            />
          </div>
          {formik.touched.price && formik.errors.price && (
            <div className={errorClassName}>{formik.errors.price}</div>
          )}
        </div>
      </div>

      <div className={`${formGroupClassName} col-span-full`}>
        <label htmlFor="description" className={labelClassName}>
          Descripción
        </label>
        <textarea
          id="description"
          {...formik.getFieldProps("description")}
          className={`${inputClassName} h-32 resize-none`}
          placeholder="Descripción del libro..."
        />
        {formik.touched.description && formik.errors.description && (
          <div className={errorClassName}>{formik.errors.description}</div>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
