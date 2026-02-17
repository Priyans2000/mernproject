import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const { userAuth } = useSelector((state) => state.user);

  const user = userAuth?.userInfo;

  // Agar login nahi hai to redirect
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-red-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-[500px] bg-white shadow-2xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          👤 User Profile
        </h1>

        <div className="space-y-4">

          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold">{user?.name}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{user?.email}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-semibold capitalize">
              {user?.role || "User"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfile;
