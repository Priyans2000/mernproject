import { useState } from "react";
import { Menu, X, Plus } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
      : "hover:text-indigo-600 transition";

  return (
    <nav className="bg-white shadow-sm border-b fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" end className="text-lg font-semibold">
            PriyanshBlog
          </NavLink>

          {/* Desktop Search */}
          <div className="hidden md:block">
            <div className="relative w-[400px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <CiSearch size={20} className="text-black" />
              </div>

              <input
                type="search"
                placeholder="Search posts..."
                className="w-full pl-12 pr-4 py-3 text-sm text-black placeholder-black
             border border-gray-300 
             rounded-full 
             focus:outline-none 
             focus:ring-2 
             focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <NavLink to="/" end className={linkStyle}>
              Home
            </NavLink>

            <NavLink to="/user-login" className={linkStyle}>
              Login
            </NavLink>

            <NavLink to="/user-register" className={linkStyle}>
              Sign Up
            </NavLink>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center space-x-4">
            <Plus
              size={22}
              className="text-white p-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
            />

            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 text-sm">
          <div className="flex flex-col space-y-3 font-medium">
            <NavLink
              to="/"
              end
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/login"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
