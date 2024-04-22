import classes from "./index.module.css";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
//@ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";
//@ts-ignore
import { activeScreen } from "../../state/atoms/screen.js";
//@ts-ignore
import { dashboardData } from "../../state/atoms/screen.js";
import SkeletonLoading from "../shared/SkeletonLoading.js";
import Toggle from "../shared/Toggle.js";
import { useEffect, useMemo, useState } from "react";
import emptydata from "../../../emptydata.json";

type Props = {
  user: any;
};

const Navbar = ({ user }: Props) => {
  const screen = useRecoilValue(activeScreen);
  const currentUser = useRecoilValueLoadable(currentUserState);
  const [liveData, setLiveData] = useState(false);
  const setDashboardData = useSetRecoilState(dashboardData);

  useEffect(() => {
    if (liveData) {
      setDashboardData(emptydata);
    } else {
      setDashboardData(undefined);
    }
  }, [liveData]);

  console.log("navbar rendered");

  const renderAction = useMemo(() => {
    if (screen === "dashboard") {
      return (
        <div className={classes.toggle}>
          <Toggle
            onClick={() => setLiveData((prev) => !prev)}
            value={liveData}
          />
          Live Data
        </div>
      );
    }
  }, [screen, liveData]);

  if (currentUser.state === "loading") {
    return (
      <div className="content">
        <SkeletonLoading
          style={{ width: "452px", height: "458px", borderRadius: "8px" }}
        />
      </div>
    );
  } else if (currentUser.state === "hasValue") {
    return (
      <header className={`${classes.header} ${"flex-row-center"}`}>
        <div className={`${classes.main}`}>
          <div className={classes.left}>
            <span className={classes.brand}>
              Hello, {user?.personal?.firstname} 👋
            </span>
            <div className={classes.linksWeb}></div>
          </div>
          <div className={classes.right}>{renderAction}</div>
        </div>
      </header>
    );
  } else {
    return;
  }
};

export default Navbar;
