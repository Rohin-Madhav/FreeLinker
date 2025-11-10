import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ClientLayout from "./components/layoutes/ClientLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import AdminLayout from "./components/layoutes/AdminLayout";
import AdminDahboard from "./pages/admin/AdminDahboard";
import FreelancerLayout from "./components/layoutes/FreelancerLayout";
import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/client" element={<ClientLayout />}>
          <Route path="client-dashboard" element={<ClientDashboard />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="admin-dashboard" element={<AdminDahboard />} />
        </Route>
        <Route path="/freelancer" element={<FreelancerLayout />}>
          <Route
            path="freelancer-dashboard"
            element={<FreelancerDashboard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
