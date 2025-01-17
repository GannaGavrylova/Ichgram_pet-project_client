import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginForm from "./components/userLoginForm";
import UserFormRegister from "./components/userFormRegister";
import MyProfile from "./pages/myProfile";
import ProfilesUsers from "./pages/profilesUsers";
import EditProfile from "./pages/editProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<UserLoginForm />} />
        <Route path="/auth/register" element={<UserFormRegister />} />
        <Route path="/home" element={<ProfilesUsers />} />
        <Route path="/users/:id" element={<MyProfile />} />
        <Route path="/users/:id/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
