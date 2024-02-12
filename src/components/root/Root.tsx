import { useRecoilValue } from "recoil";
import RenderScreen from "../screens/RenderScreen";
import classes from "./index.module.css";
//@ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LeftNavigation from "../navbar/LeftNavigation.js";
import Navbar from "../navbar/Navbar.js";

type Props = {};

const Root = (props: Props) => {
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
    }
  }, []);
  return (
    <>
      <LeftNavigation />
      <div className="content">
        <Navbar />
        <div className={classes.root}>
          <RenderScreen />
        </div>
      </div>
    </>
  );
};

export default Root;
