import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/HomePage/Homepage.jsx";
import Login from "./user/LoginPage/loginPage.jsx";
import Profile from "./user/userprofile/userProfile.jsx";
import Layout from "./Layout";
import Register from "./user/RegisterPage/Register.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrap Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user-profile" element={<Profile />} />
        </Route>

        {/* Auth Route (No Navbar) */}
        <Route path="/user-register" element={<Register />} />
        <Route path="/user-login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;