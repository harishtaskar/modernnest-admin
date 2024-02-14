import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import RenderScreen from "../screens/RenderScreen";
import classes from "./index.module.css";
//@ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import LeftNavigation from "../navbar/LeftNavigation.js";
import Navbar from "../navbar/Navbar.js";
import ExpiredToken from "../screens/not-found/ExpiredToken.js";
import SkeletonLoading from "../shared/SkeletonLoading.js";

type Props = {};

const Root = (props: Props) => {
  const currentUser = useRecoilValueLoadable(currentUserState);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("authorization")?.length &&
      currentUser.state !== "hasError"
    ) {
      navigate("/signin");
    } else {
      navigate("/?theme=light");
    }
  }, [currentUser]);

  const renderScreen = useMemo(() => {
    if (currentUser.state === "loading") {
      return (
        <div className="background">
          <i
            className="loading"
            style={{
              borderColor: "white white black black",
              width: "30px",
              height: "30px",
            }}
          />
        </div>
      );
    } else if (currentUser.state === "hasValue") {
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
    } else if (currentUser.state === "hasError") {
      return <ExpiredToken />;
    }
  }, [currentUser]);

  return renderScreen;
};

export default Root;
