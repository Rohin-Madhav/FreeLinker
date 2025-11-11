import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { X, Bell, User, Settings, LogOut, Search } from "lucide-react";
import Sidebar from "../Sidebar";

function AdminLayoute() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  return (
    <div>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo & Menu Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">
                  Admin Panel
                </span>
              </div>
            </div>

            {/* Center - Search Bar (hidden on mobile) */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, projects, transactions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationDropdown(!notificationDropdown)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {notificationDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <a
                        href="#"
                        className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          New user registered
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          2 minutes ago
                        </p>
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          Payment completed
                        </p>
                        <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                      </a>
                      <a href="#" className="block px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">
                          Project reported
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          3 hours ago
                        </p>
                      </a>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <a
                        href="#"
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        View all notifications
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-700">Admin</p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                  </div>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        Admin User
                      </p>
                      <p className="text-xs text-gray-500">
                        admin@freelinker.com
                      </p>
                    </div>
                    <a
                      href="/admin/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </a>
                    <a
                      href="/admin/settings"
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
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </nav>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default AdminLayoute;
