import React, { useState } from "react";
import {
  Bell,
  User,
  Settings,
  LogOut,
  DollarSign,
  Star,
  Menu,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

function FreelancerLayout() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* ===== Navbar ===== */}
      <nav className="border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* ===== Left: Mobile Menu + Logo ===== */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-64 bg-white dark:bg-gray-900 p-6"
                  >
                    <Sidebar />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-zinc-800 to-zinc-500 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  FreeLinker
                </span>
              </div>
            </div>

            {/* ===== Right: Actions ===== */}
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
                  className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {notificationDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          New project invitation
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Web Development - $500
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Alex Johnson
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        4.9 (127)
                      </span>
                    </div>
                  </div>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Alex Johnson
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Full Stack Developer
                      </p>
                    </div>
                    <a
                      href="/freelancer/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </a>
                    <a
                      href="/freelancer/settings"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </a>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Main Section (Sidebar + Outlet) ===== */}
      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
        {/* Sidebar only visible on md+ screens */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}

export default FreelancerLayout;
