import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import BookPage from "./pages/BookPage";
import AuthInitializer from "./components/AuthInitializer";
import BookDetail from './components/BookDetail';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthInitializer>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <BookPage />
              </PrivateRoute>
            }
          />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/edit/:id" element={
            <PrivateRoute>
              <EditBook />
            </PrivateRoute>
          } />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthInitializer>
  );
}

export default App;
