import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { FormError } from "../components/FormError";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .required("El nombre es obligatorio"),
      email: Yup.string()
        .email("Formato de correo electrónico inválido")
        .required("El correo electrónico es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
      confirmPassword: Yup.string()
        .required("La confirmación de contraseña es obligatoria")
        .test(
          "passwords-match",
          "Las contraseñas no coinciden",
          function (value) {
            return validatePasswordMatch(this.parent.password, value || "");
          }
        ),
    }),
    onSubmit: async (values) => {
      if (!validatePasswordMatch(values.password, values.confirmPassword)) {
        setError("Las contraseñas no coinciden");
        return;
      }

      try {
        await authService.register({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        navigate("/login");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ha ocurrido un error");
      }
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <button
          onClick={handleBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <h2 className="text-3xl text-center font-extrabold text-gray-900">Crear cuenta</h2>
        <div className="w-16"></div>
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="name" className="sr-only">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nombre completo"
            />
            {formik.touched.name && formik.errors.name && (
              <FormError message={formik.errors.name} />
            )}

            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Correo electrónico"
            />
            {formik.touched.email && formik.errors.email && (
              <FormError message={formik.errors.email} />
            )}

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
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Contraseña"
            />
            {formik.touched.password && formik.errors.password && (
              <FormError message={formik.errors.password} />
            )}

            <label htmlFor="confirmPassword" className="sr-only">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirmar contraseña"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <FormError message={formik.errors.confirmPassword} />
              )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
        </form>
        {error && <FormError message={error} />}
      </div>
    </div>
  );
};

export default RegisterPage;
