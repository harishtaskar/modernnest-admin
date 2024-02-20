import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Root from "./components/root/Root";
import "./index.css";
import LeftNavigation from "./components/navbar/LeftNavigation";
import RenderModal from "./components/render-model/RenderModal";
import { Slide, ToastContainer } from "react-toastify";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
//@ts-ignore
import { currentUserState } from "./state/atoms/screen.js";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
      <RenderModal />
      <div className={"body"}>
        <Routes>
          <Route path="*" element={<Root />} />
          <Route path="/signin" element={<Login onClose={() => {}} />} />
          <Route path="/signup" element={<Registration onClose={() => {}} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
