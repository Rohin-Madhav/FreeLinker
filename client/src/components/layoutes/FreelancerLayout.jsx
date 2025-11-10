import React, { useState } from "react";
import {
  Menu,
  X,
  Bell,
  User,
  Settings,
  LogOut,
  DollarSign,
  Briefcase,
  MessageSquare,
  Search,
  Star,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function FreelancerLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  return (
    <div>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">
                FreeLinker
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
             
              <a
                href="/freelancer/payments"
                className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition font-medium"
              >
                <DollarSign className="w-4 h-4" />
                Payments
              </a>
              <a
                href="/freelancer/messages"
                className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition font-medium relative"
              >
                <MessageSquare className="w-4 h-4" />
                Messages
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </a>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Earnings Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  $2,450
                </span>
              </div>

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
                          New project invitation
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Web Development - $500
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          5 minutes ago
                        </p>
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          Payment received
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          $350 for Logo Design
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          2 hours ago
                        </p>
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          Client review received
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          5 stars from John Smith
                        </p>
                        <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                      </a>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <a
                        href="#"
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
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
                  <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700">
                      Alex Johnson
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-500">4.9 (127)</span>
                    </div>
                  </div>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        Alex Johnson
                      </p>
                      <p className="text-xs text-gray-500">
                        Full Stack Developer
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-gray-600">
                          4.9 (127 reviews)
                        </span>
                      </div>
                    </div>
                    <a
                      href="/freelancer/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </a>
                    <a
                      href="/freelancer/portfolio"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <Briefcase className="w-4 h-4" />
                      Portfolio
                    </a>
                    <a
                      href="/freelancer/settings"
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
            <div className="lg:hidden">
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
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {/* Earnings Badge */}
              <div className="flex items-center justify-between px-3 py-2 bg-green-50 border border-green-200 rounded-md mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Total Earnings
                </span>
                <span className="text-lg font-bold text-green-600">$2,450</span>
              </div>

              <a
                href="/freelancer/dashboard"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
              >
                Dashboard
              </a>
              <a
                href="/freelancer/find-work"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
              >
                <Search className="w-4 h-4" />
                Find Work
              </a>
              <a
                href="/freelancer/projects"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
              >
                <Briefcase className="w-4 h-4" />
                My Projects
              </a>
              <a
                href="/freelancer/payments"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
              >
                <DollarSign className="w-4 h-4" />
                Payments
              </a>
              <a
                href="/freelancer/messages"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                Messages
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
              </a>
              <hr className="my-2" />
              <a
                href="/freelancer/profile"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <User className="w-4 h-4" />
                Profile
              </a>
              <a
                href="/freelancer/portfolio"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <Briefcase className="w-4 h-4" />
                Portfolio
              </a>
              <a
                href="/freelancer/settings"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <Settings className="w-4 h-4" />
                Settings
              </a>
              <button className="w-full flex items-center gap-2 text-left px-3 py-2 text-red-600 hover:bg-gray-50 rounded-md">
                <LogOut className="w-4 h-4" />
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

export default FreelancerLayout;
