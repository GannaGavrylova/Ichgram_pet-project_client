import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthForm from "./components/userAuthForm";
import UserFormRegister from "./components/userFormRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<UserAuthForm />} />
        <Route path="/auth/register" element={<UserFormRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
