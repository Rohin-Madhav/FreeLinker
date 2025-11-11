import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Menu,
  Home,
  Users,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState("");

  // Fetch user role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role")?.toLowerCase();
    setRole(storedRole || "freelancer");
  }, []);

  // Define nav items for each role
  const navItemsByRole = {
    admin: [
      {
        label: "Admin Dashboard",
        path: "/admin/admin-dashboard",
        icon: <Home className="w-5 h-5" />,
      },
      {
        label: "Manage Users",
        path: "/admin/manage-users",
        icon: <Users className="w-5 h-5" />,
      },
      {
        label: "Reports",
        path: "/admin/reports",
        icon: <Briefcase className="w-5 h-5" />,
      },
    ],
    freelancer: [
      {
        label: "Freelancer Dashboard",
        path: "/freelancer/freelancer-dashboard",
        icon: <Home className="w-5 h-5" />,
      },
      {
        label: "My Projects",
        path: "/freelancer/projects",
        icon: <Briefcase className="w-5 h-5" />,
      },
      {
        label: "Profile",
        path: "/freelancer/profile",
        icon: <Users className="w-5 h-5" />,
      },
    ],
    client: [
      {
        label: "Client Dashboard",
        path: "/client/client-dashboard",
        icon: <Home className="w-5 h-5" />,
      },
      {
        label: "Hire Talent",
        path: "/client/hire",
        icon: <Users className="w-5 h-5" />,
      },
      {
        label: "My Projects",
        path: "/client/projects",
        icon: <Briefcase className="w-5 h-5" />,
      },
    ],
  };

  const navItems = navItemsByRole[role] || [];

  return (
    <>
      {/* 📱 Mobile Sidebar (Drawer) */}
      <div className="md:hidden flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 bg-white dark:bg-gray-900 p-6"
          >
            <SidebarContent location={location} navItems={navItems} />
          </SheetContent>
        </Sheet>
        <h1 className="ml-4 font-bold text-xl text-gray-900 dark:text-gray-100">
          FreeLinker
        </h1>
      </div>

      {/* 💻 Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col h-screen border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between mb-8 p-4">
          {!collapsed && (
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              FreeLinker
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </Button>
        </div>

        <SidebarContent
          location={location}
          navItems={navItems}
          collapsed={collapsed}
        />
      </aside>
    </>
  );
}

// 🌓 Sidebar Content + Dark Mode Toggle
function SidebarContent({ location, navItems, collapsed }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // Update DOM + storage when toggled
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="flex flex-col justify-between flex-1 px-2">
      <div className="space-y-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                active
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              } ${collapsed ? "justify-center" : ""}`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <>
            <Link
              to="/logout"
              className="text-gray-500 dark:text-gray-400 text-sm hover:text-red-600 transition"
            >
              Log out
            </Link>

            <Separator className="my-4" />

            {/* 🌗 Dark Mode Toggle */}
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                {darkMode ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
                <span>Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>

            {/* 👤 User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full mt-4">
                  User Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </nav>
  );
}
