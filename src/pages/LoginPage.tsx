import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { FormError } from "../components/FormError";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
        .required("El nombre de usuario es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (values) => {
      try {
        await authService.login({
          username: values.username,
          password: values.password,
        });
        navigate("/books");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ha ocurrido un error");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-3xl text-center font-extrabold text-gray-900">
          Iniciar sesión
        </h2>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Nombre de usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nombre de usuario"
              />
              {formik.touched.username && formik.errors.username && (
                <FormError message={formik.errors.username} />
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
              {formik.touched.password && formik.errors.password && (
                <FormError message={formik.errors.password} />
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>

          {error && <FormError message={error} />}

          <div className="text-sm text-center mt-4">
            <span className="text-gray-600">¿No tienes una cuenta? </span>
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Regístrate aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
