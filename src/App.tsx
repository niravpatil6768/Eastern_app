import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Grid, Grid2 } from "@mui/material";
import HomePage from "./Pages/HomePage";
import AddUser from "./Pages/AddUser";
import { useNavigate, Navigate } from "react-router-dom";
import { getToken } from "./utils/localStorage";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = getToken();
  return token ? element : <Navigate to="/" />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div id="recaptcha-container"></div>
        <Grid style={{ minHeight: "calc(100vh - 137px)" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<HomePage />} />}
            />
            <Route
              path="/adduser"
              element={<ProtectedRoute element={<AddUser />} />}
            />
          </Routes>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default App;
