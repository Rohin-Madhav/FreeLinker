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
import Works from "./pages/freelancer/Works";
import FreelancerProposals from "./pages/freelancer/Proposals";
import FreelancerReviews from "./pages/freelancer/MyReviews";
import Profile from "./pages/freelancer/Profile";
import ClientProposals from "./pages/client/Proposals"
import Payments from "./pages/client/Payments";
import OngoingWorks from "./pages/client/OngoingWorks";
import ClientReviews from "./pages/client/Reviews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
         {/* region Client */}
        <Route path="/client/:id" element={<ClientLayout />}>
          <Route path="client-dashboard" element={<ClientDashboard />} />
          <Route path="proposals" element={<ClientProposals />} />
          <Route path="payments" element={<Payments />} />
          <Route path="ongoing-projects" element={<OngoingWorks />} />
          <Route path="my-review" element={<ClientReviews />} />
        </Route>
        {/* //region  Admin */}
        <Route path="/admin/:id" element={<AdminLayout />}>
          <Route path="admin-dashboard/:id" element={<AdminDahboard />} />
        </Route>
        {/* //region Freelancer */}
        <Route path="/freelancer/:id" element={<FreelancerLayout />}>
          <Route path="my-works" element={<Works />} />
          <Route path="my-proposals" element={<FreelancerProposals />} />
          <Route path="my-reviews" element={<FreelancerReviews />} />
          <Route path="my-profile" element={<Profile />} />
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
