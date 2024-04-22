import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/root/Root";
import "./index.css";
import RenderModal from "./components/render-model/RenderModal";
import { Slide, ToastContainer } from "react-toastify";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
//@ts-ignore
import { currentUserState } from "./state/atoms/screen.js";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    localStorage.setItem("PORT", "http://localhost:3000");
  }, []);

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
        theme="dark"
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
