import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/users/userSlices";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Image from "../../assets/lack.jpeg";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const { loading, userAuth, success } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (userAuth?.error) {
      toast.error(userAuth?.error?.msg || "Registration Failed ❌");
    }

    if (success) {
      toast.success("Registration Successful 🎉");

      setTimeout(() => {
        navigate("/user-profile", { replace: true });
      }, 1000);
    }
  }, [userAuth?.error, success, navigate]);

  return (
    <>
      <Toaster position="top-center" />

      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="w-full max-w-[460px]">
          <div className="relative bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 text-white">
            {/* Close Button INSIDE CARD */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
            >
              <X className="text-gray-700 w-5 h-5" />
            </button>

            <h1 className="text-3xl font-semibold text-center text-indigo-600 focus:ring-indigo-500">
              SignUp your Account
            </h1>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              {/* Username */}
              <input
                type="text"
                name="name"
                placeholder="Enter username"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
              />

              {/* Password */}
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
              />

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-indigo-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember me
                </label>

                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-indigo-600 hover:underline font-medium cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white
                       bg-gradient-to-r from-indigo-600 to-blue-600
                       flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {loading ? "Logging in..." : "SignUp Account"}
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-black mt-6">
                Don’t have an account?
                <span
                  onClick={() => navigate("/register")}
                  className="text-indigo-600 font-semibold hover:underline ml-1 cursor-pointer"
                >
                  Register here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
