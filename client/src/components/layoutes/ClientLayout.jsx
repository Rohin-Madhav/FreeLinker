import React, { useState } from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import { Menu, X, Bell, User, Settings, LogOut } from "lucide-react";

function ClientLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  return (
    <div>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">
                FreeLinker
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="/client/dashboard"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Dashboard
              </a>
              <a
                href="/client/projects"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                My Projects
              </a>
              <a
                href="/client/freelancers"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Find Freelancers
              </a>
              <a
                href="/client/messages"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Messages
              </a>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    John Doe
                  </span>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <a
                      href="/client/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </a>
                    <a
                      href="/client/settings"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </a>
                    <hr className="my-1" />
                    <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-50 w-full text-left">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a
                href="/client/dashboard"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
              >
                Dashboard
              </a>
              <a
                href="/client/projects"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
              >
                My Projects
              </a>
              <a
                href="/client/freelancers"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
              >
                Find Freelancers
              </a>
              <a
                href="/client/messages"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
              >
                Messages
              </a>
              <hr className="my-2" />
              <a
                href="/client/profile"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Profile
              </a>
              <a
                href="/client/settings"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Settings
              </a>
              <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50 rounded-md">
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
}

export default ClientLayout;
