import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthForm from "./components/userAuthForm";
import UserFormRegister from "./components/userFormRegister";
import Home from "./pages/home";
import MyProfile from "./pages/myProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<UserAuthForm />} />
        <Route path="/auth/register" element={<UserFormRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users/:id" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
