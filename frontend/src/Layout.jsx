import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./component/Navbar/PublicnavBar";
import PNavbar from "./component/Navbar/PrivatenavBar";

const Layout = () => {

  const userInfo = useSelector(
    (state) => state.user.userAuth.userInfo
  );

  const isLoggedIn = !!userInfo;

  return (
    <>
      {isLoggedIn ? <PNavbar /> : <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;