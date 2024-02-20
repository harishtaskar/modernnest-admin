import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import RenderScreen from "../screens/RenderScreen";
import classes from "./index.module.css";
//@ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import LeftNavigation from "../navbar/LeftNavigation.js";
import Navbar from "../navbar/Navbar.js";
import ExpiredToken from "../screens/not-found/ExpiredToken.js";
import ServerDown from "../screens/not-found/ServerDown.js";

type Props = {};

const Root = ({}: Props) => {
  const currentUser = useRecoilValueLoadable(currentUserState);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("authorization")?.length &&
      currentUser.state !== "hasError"
    ) {
      navigate("/signin");
    } else {
      navigate("/");
    }
  }, [currentUser]);

  const renderScreen = useMemo(() => {
    if (currentUser.state === "loading") {
      return (
        <div
          className="background"
          style={{ backgroundColor: "var(--background)" }}
        >
          <i
            className="loading"
            style={{
              borderColor:
                "var(--white) var(--white) var(--text-color) var(--text-color)",
              width: "30px",
              height: "30px",
            }}
          />
        </div>
      );
    } else if (currentUser.state === "hasValue") {
      if (currentUser.contents !== undefined) {
        return (
          <>
            <LeftNavigation />
            <div className="content">
              <Navbar user={currentUser.contents} />
              <div className={classes.root}>
                <RenderScreen />
              </div>
            </div>
          </>
        );
      } else {
        return <ExpiredToken />;
      }
    } else if (
      currentUser.state === "hasError" &&
      currentUser.contents.code === "ERR_NETWORK"
    ) {
      return <ServerDown />;
    } else {
      return <ExpiredToken />;
    }
  }, [currentUser]);

  return renderScreen;
};

export default Root;
