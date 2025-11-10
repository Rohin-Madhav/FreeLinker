import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-900 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">
                FreeLinker
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Find Talent
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Find Work
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Why Us
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button onClick={()=>navigate("/login")} className="text-gray-600 hover:text-gray-900 transition">
                Log In
              </button>
              <button onClick={()=>navigate("/register")}  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              >
                Find Talent
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              >
                Find Work
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              >
                Why Us
              </a>
              <Link to={"/login"}
                href="#"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              >
                Log In
              </Link>
              <button onClick={()=>navigate("/register")}  className="w-full mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
