import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./component/Homepage.jsx";
import Login from "./user/loginPage.jsx";

const app = () => {
  
  return (
    <>
    
      <BrowserRouter>
      <Routes>

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />        

      </Routes>
      </BrowserRouter>

    </>
  );

};
export default app;
