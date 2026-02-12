import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/users/userSlices";
// import {link} from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    dispatch(
      loginUser({
        name: formData.name,
        password: formData.password,
      }),
    );
    setFormData({
      name: "",
      password: "",
    });

    // Yaha future me API call kar sakte ho
    // axios.post("/api/login", formData)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-blue-600 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-[460px]">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8">
          <h1 className="text-3xl font-semibold text-center text-slate-900">
            Welcome back 👋
          </h1>
          <p className="text-center text-slate-500 text-sm mt-1">
            Please login to continue
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your username"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  👤
                </span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-indigo-600 hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white
                         bg-gradient-to-r from-indigo-600 to-blue-600
                         hover:from-indigo-700 hover:to-blue-700
                         transition-all duration-200
                         hover:-translate-y-[1px] hover:shadow-lg"
            >
              Sign in
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-slate-600 mt-6">
              Don’t have an account?
              <a
                href="#"
                className="text-indigo-600 font-semibold hover:underline ml-1"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
