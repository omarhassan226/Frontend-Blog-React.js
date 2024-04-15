import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AddPost from "./pages/AddPost";
import NavBar from "./pages/NavBar";
import EditPost from "./pages/EditPost";
import AuthContext, { useAuth } from "./pages/AuthContext";

const App = () => {
  // const { isDarkMode } = useAuth()
  return <Router>
      <AuthContext>
        <div>
          <NavBar />
        <div className={` py-10 flex justify-center `}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/addPost" element={<AddPost />} />
              <Route path="/editPost/:id" element={<EditPost />} />
              {/* Define other routes here */}
            </Routes>
          </div>
        </div>
      </AuthContext>
    </Router>;
      };;

export default App;
