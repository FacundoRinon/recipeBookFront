import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import NewRecipe from "./pages/NewRecipe";
import RecipePage from "./pages/RecipePage";
import OtherProfile from "./pages/OtherProfile";
import EditProfile from "./pages/EditProfile";
import Follows from "./pages/Follows";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/newRecipe" element={<NewRecipe />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/user/:id" element={<OtherProfile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/follows/:id" element={<Follows />} />
          <Route path="/recipe/edit/:id" element={<EditRecipe />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
