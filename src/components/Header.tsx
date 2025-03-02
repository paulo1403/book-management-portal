import { useState } from "react";
import { FaUser } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";
import { AiOutlineBarChart } from "react-icons/ai";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Book Management</h1>
          <nav className="space-x-4">
            <Link
              to="/books/stats"
              className="flex items-center text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <AiOutlineBarChart className="mr-2" />
              Estadísticas
            </Link>
          </nav>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <FaUser className="h-5 w-5" />
              <span className="ml-2">{user?.username || "Usuario"}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <div>{user?.username || "Usuario"}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
