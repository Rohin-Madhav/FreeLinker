import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Footer from "../Footer";
import {  X, Bell, User, Settings, LogOut } from "lucide-react";
import Sidebar from "../Sidebar";
import api from "@/services/Api";


function ClientLayout() {
  const {id} = useParams()
  const [users,setUsers]=useState("")
  const [profileDropdown, setProfileDropdown] = useState(false);
  useEffect(()=>{
  
    const fetchUser = async () =>{
  try {
    const response = await api.get(`/users/${id}`)
    setUsers(response.data)
    
  } catch (error) {
    console.log("error fetching user",error);
    
  }
    }
fetchUser()

  },[id])
  return (

    <div>
      <nav className=" border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold ">
                FreeLinker
              </span>
            </div>

            {/* Desktop Navigation */}
           

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2  hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-2 cursor-pointer rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 " />
                  </div>
                  <span className="text-sm font-medium ">
                    {users.username}
                  </span>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48  rounded-lg shadow-lg border border-gray-200 py-1">
                    <a
                      href="/client/profile"
                      className="flex items-center gap-2 px-4 py-2  "
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </a>
                    <a
                      href="/client/settings"
                      className="flex items-center gap-2 px-4 py-2 "
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
        </div>

        {/* Mobile Menu */}
        
      </nav>
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
      <Footer />
    </div>
  );
}

export default ClientLayout;
