import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// import RegistrationPage from "./pages/RegistrationPage";
// import BookPage from "./pages/BookPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegistrationPage />} />
        <Route path="/books" element={<BookPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
