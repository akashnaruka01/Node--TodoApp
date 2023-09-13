import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "./main";

const App = () => {
  const { SetUser, SetIsAuthenticated, SetLoader } = useContext(Context);

  useEffect(() => {
    SetLoader(true);
    axios
      .get(`${server}/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        SetUser(res.data.user);
        SetIsAuthenticated(true);
        SetLoader(false);
      })
      .catch((error) => {
        SetUser({});
        SetIsAuthenticated(false);
        SetLoader(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
