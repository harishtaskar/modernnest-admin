import { useRecoilState, useRecoilValueLoadable } from "recoil";
import classes from "./index.module.css";
// @ts-ignore
import { activeScreen } from "./../../state/atoms/screen.js";
// @ts-ignore
import { currentUserState, darkmodeState } from "../../state/atoms/screen.js";
import { useEffect, useMemo, useState } from "react";
import Toggle from "../shared/Toggle.js";
import { useNavigate } from "react-router-dom";
import SkeletonLoading from "../shared/SkeletonLoading.js";
import useAPI from "../../hooks/Other/useAPI.js";
import { PORT } from "../../../config.js";

const LeftNavigation = () => {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("collapsed") || "false"
  );
  const [firstRender, setFirstRender] = useState(false);
  const currentUser = useRecoilValueLoadable(currentUserState);
  const [darkmode, setDarkmode] = useRecoilState<boolean>(darkmodeState);
  const navigate = useNavigate();

  const [activeScreenState, setActiveScreenState] =
    useRecoilState<string>(activeScreen);

  const { patchRequest } = useAPI();

  // useEffect(() => {
  //   setSearchParam(`?theme=light`);
  // }, []);

  useEffect(() => {
    const headTag = document.getElementsByTagName("head")[0];
    if (darkmode) {
      const styleTag = document.createElement("style");
      styleTag.id = "styleID";

      styleTag.innerHTML = `
      :root body{
        --text-color: #fffffff3;
        --background: #292929;
        --white: #000000;
        --muted-border: #FFFFFF40;
        --text-color-2: #c5c5c5;
        --light-gray-1: #3a3a3a;
        --second-text-color: #c7c7c7;
        --second-border-color: #616161;
        --active-li: rgba(255, 255, 255, 0.15);
        --skeleton: #e2e5e753;
      }`;
      headTag.appendChild(styleTag);
    } else {
      const styleTag = document.getElementById("styleID");
      if (styleTag) {
        headTag.removeChild(styleTag);
      }
    }
  }, [darkmode]);

  useEffect(() => {
    const themeHandler = async () => {
      await patchRequest(`${PORT}/seller/update`, {
        update: { darkmode: darkmode },
      });
    };
    if (firstRender) {
      themeHandler();
    } else {
      setFirstRender(true);
    }
  }, [darkmode]);

  useEffect(() => {
    localStorage.getItem("screen") !== "undefined"
      ? ""
      : localStorage.setItem("screen", "dashboard");
    setDarkmode(currentUser?.contents?.darkmode || false);
    setActiveScreenState(localStorage.getItem("screen") || "dashboard");
  }, []);

  useEffect(() => {
    localStorage.setItem("collapsed", `${collapsed}`);
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem("screen", activeScreenState);
  }, [activeScreenState]);

  const renderNavBar = useMemo(() => {
    return (
      <div className={classes.leftNav}>
        <div>
          <div className={classes.title}>
            <button
              className={classes.menu}
              onClick={() =>
                setCollapsed((prev) => {
                  return prev === "true" ? "false" : "true";
                })
              }
            >
              <i
                className={
                  collapsed === "true"
                    ? "ri-menu-unfold-line ri-2x"
                    : "ri-menu-fold-line ri-2x"
                }
              ></i>
            </button>
            {collapsed === "false" && (
              <span className={`${classes.brand} ${classes.light}`}>
                ModernNest
              </span>
            )}
          </div>
          <ul className={classes.ul}>
            <li
              className={`${classes.li} ${
                activeScreenState === "dashboard" ? classes.active : ""
              }`}
              onClick={() => setActiveScreenState("dashboard")}
            >
              <i
                className="ri-dashboard-2-line"
                style={{ paddingLeft: "20px" }}
              />
              {collapsed === "false" && "Dashboard"}
            </li>
            <li
              className={`${classes.li} ${
                activeScreenState === "products" ? classes.active : ""
              }`}
              onClick={() => setActiveScreenState("products")}
            >
              <i
                className="ri-parking-box-line"
                style={{ paddingLeft: "20px" }}
              />
              {collapsed === "false" && "Products"}
            </li>
            <li
              className={`${classes.li} ${
                activeScreenState === "profile" ? classes.active : ""
              }`}
              onClick={() => setActiveScreenState("profile")}
            >
              <i className="ri-profile-fill" style={{ paddingLeft: "20px" }} />
              {collapsed === "false" && "Profile"}
            </li>
            <li
              className={`${classes.li} ${
                activeScreenState === "settings" ? classes.active : ""
              }`}
              onClick={() => setActiveScreenState("settings")}
            >
              <i
                className="ri-equalizer-line"
                style={{ paddingLeft: "20px" }}
              />
              {collapsed === "false" && "Settings"}
            </li>
          </ul>
        </div>
        <div>
          <ul className={classes.ul}>
            <li
              className={`${classes.li}`}
              onClick={() => {
                /* Logout Logic */
              }}
              style={
                collapsed
                  ? { marginLeft: "10px" }
                  : {
                      justifyContent: "flex-start",
                      gap: "20px",
                      marginLeft: "20px",
                      width: "100%",
                    }
              }
            >
              <Toggle
                onClick={() => setDarkmode((prev: boolean) => !prev)}
                value={darkmode}
              />
              {collapsed === "false" && "Dark Mode"}
            </li>
            <li
              className={`${classes.li} ${activeScreenState}`}
              onClick={() => {
                localStorage.setItem("authorization", "");
                navigate("/signin");
              }}
              style={{ marginBottom: "10px", width: "100%" }}
            >
              <i
                className="ri-logout-box-r-line"
                style={{ paddingLeft: "20px" }}
              />
              {collapsed === "false" && "Logout"}
            </li>
          </ul>
        </div>
      </div>
    );
  }, [activeScreenState, collapsed, darkmode]);

  if (currentUser.state === "loading") {
    return (
      <div>
        <SkeletonLoading
          style={{ width: "240px", height: "100vh", borderRadius: "8px" }}
        />
      </div>
    );
  } else if (currentUser.state === "hasValue") {
    return renderNavBar;
  } else if (currentUser.state === "hasError") {
    return;
  }
};

export default LeftNavigation;
