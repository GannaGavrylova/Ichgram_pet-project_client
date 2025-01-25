import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginForm from "./components/userLoginForm";
import UserFormRegister from "./components/userFormRegister";
import MyProfile from "./pages/myProfile";
import ProfilesUsers from "./pages/profilesUsers";
import EditProfile from "./pages/editProfile";
import CreatePost from "./pages/createPost";
import PostDetails from "./pages/postDetails";
import OtherProfile from "./pages/otherProfile";
import ProfileRouteHandler from "./components/profileRouteHandler";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<UserLoginForm />} />
        <Route path="/auth/register" element={<UserFormRegister />} />
        <Route path="/home" element={<ProfilesUsers />} />
        <Route path="/users/:id" element={<ProfileRouteHandler />} />
        {/* <Route path="/users/:id" element={<MyProfile />} /> */}
        <Route path="/users/:id/edit-profile" element={<EditProfile />} />
        <Route path="/post/create-post" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostDetails />} />
        {/* <Route path="/users/:other-userId" element={<OtherProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
