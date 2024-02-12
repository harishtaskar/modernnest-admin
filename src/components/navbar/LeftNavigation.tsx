import { useRecoilState } from "recoil";
import classes from "./index.module.css";
// @ts-ignore
import { activeScreen } from "./../../state/atoms/screen.js";
// @ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";
import { useEffect, useMemo, useState } from "react";
import Toggle from "../shared/Toggle.js";
import { useSearchParams } from "react-router-dom";

const LeftNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const [activeScreenState, setActiveScreenState] =
    useRecoilState(activeScreen);

  console.log(searchParam.get("theme"));

  // useEffect(() => {
  //   setSearchParam(`?theme=light`);
  // }, []);

  useEffect(() => {
    const headTag = document.getElementsByTagName("head")[0];
    if (searchParam.get("theme") === "dark") {
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
      }`;
      headTag.appendChild(styleTag);
    } else {
      const styleTag = document.getElementById("styleID");
      if (styleTag) {
        headTag.removeChild(styleTag);
      }
    }
  }, [searchParam.get("theme")]);

  const renderNavBar = useMemo(() => {
    return (
      <div className={classes.leftNav}>
        <div>
          <div className={classes.title}>
            <button
              className={classes.menu}
              onClick={() => setCollapsed((prev) => !prev)}
            >
              <i className="ri-menu-line ri-xl"></i>
            </button>
            {!collapsed && (
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
              {!collapsed && "Dashboard"}
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
              {!collapsed && "Products"}
            </li>
            <li
              className={`${classes.li} ${
                activeScreenState === "profile" ? classes.active : ""
              }`}
              onClick={() => setActiveScreenState("profile")}
            >
              <i className="ri-profile-fill" style={{ paddingLeft: "20px" }} />
              {!collapsed && "Profile"}
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
              {!collapsed && "Settings"}
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
                  ? { marginLeft: "5px" }
                  : {
                      justifyContent: "flex-start",
                      gap: "20px",
                      marginBottom: "5px",
                      marginLeft: "20px",
                      width: "100%",
                    }
              }
            >
              <Toggle
                onClick={() => {
                  setSearchParam(() => {
                    if (searchParam.get("theme") === "light") {
                      return `?theme=dark`;
                    } else {
                      return `?theme=light`;
                    }
                  });
                }}
                value={searchParam.get("theme") === "dark" ? true : false}
              />
              {!collapsed && "Dark Mode"}
            </li>
            <li
              className={`${classes.li} ${activeScreenState}`}
              onClick={() => {
                /* Logout Logic */
              }}
              style={{ marginBottom: "10px", width: "100%" }}
            >
              <i
                className="ri-logout-box-r-line"
                style={{ paddingLeft: "20px" }}
              />
              {!collapsed && "Logout"}
            </li>
          </ul>
        </div>
      </div>
    );
  }, [activeScreenState, collapsed, searchParam.get("theme")]);

  if (currentUser) {
    return renderNavBar;
  } else {
    return;
  }
};

export default LeftNavigation;
