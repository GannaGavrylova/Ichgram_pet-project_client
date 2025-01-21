import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginForm from "./components/userLoginForm";
import UserFormRegister from "./components/userFormRegister";
import MyProfile from "./pages/myProfile";
import ProfilesUsers from "./pages/profilesUsers";
import EditProfile from "./pages/editProfile";
import CreatePost from "./pages/createPost";
import PostDetails from "./pages/postDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<UserLoginForm />} />
        <Route path="/auth/register" element={<UserFormRegister />} />
        <Route path="/home" element={<ProfilesUsers />} />
        <Route path="/users/:id" element={<MyProfile />} />
        <Route path="/users/:id/edit-profile" element={<EditProfile />} />
        <Route path="/post/create-post" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
