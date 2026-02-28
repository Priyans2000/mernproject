
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/users/userSlices";
import { Toaster, toast } from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();

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
      toast.error(userAuth?.error?.msg || "Login Failed ❌");
    }

    if (success) {
      toast.success("Login Successful 🎉");
    }
  }, [userAuth?.error, success]);

  return (
    <>
      {/*  IMPORTANT */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px",
            fontSize: "14px",
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-red-800 to-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-[460px]">
          <div className="bg-white shadow-2xl rounded-2xl p-8">
            <h1 className="text-3xl font-semibold text-center text-slate-900">
              Welcome back 👋
            </h1>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter username"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300"
              />

              <input
                // type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300"
              />
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
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white
                           bg-gradient-to-r from-indigo-600 to-blue-600
                           flex items-center justify-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {loading ? "Logging in..." : "Login Account"}
              </button>
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
    </>
  );
};

export default LoginPage;
