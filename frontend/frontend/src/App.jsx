import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/HomePage/Homepage.jsx";
import Login from "./user/LoginPage/loginPage.jsx";
import UserProfile from "./user/userprofile/userProfile.jsx";
const app = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default app;
