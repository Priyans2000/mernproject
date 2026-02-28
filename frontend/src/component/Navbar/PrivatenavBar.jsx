import { useState } from "react";
import { Menu, X, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../../redux/slices/users/userSlices";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Get user from Redux
  const userInfo = useSelector((state) => state.user.userAuth.userInfo);

  const isLoggedIn = !!userInfo?.token;

  // Logout Handler
  const handleLogout = () => {
    const confromLogout = window.confirm("Are you sure you want to logout?");
    if (confromLogout) {
      dispatch(logoutuser());
      alert("Logout Successful");
      navigate("/", { replace: true });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-lg font-semibold">
            PriyanshBlog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                  <Plus size={16} />
                  Add Post
                </button>

                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="w-10 h-10 rounded-full border"
                />

                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            {isLoggedIn && <Plus size={22} className="text-indigo-600" />}

            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2 text-sm">
          <Link to="/" className="block" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          <Link to="/posts" className="block" onClick={() => setIsOpen(false)}>
            Posts
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>

              <button onClick={handleLogout} className="block text-red-500">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
