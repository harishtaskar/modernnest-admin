import classes from "./index.module.css";
import { useRecoilValueLoadable } from "recoil";
//@ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";
import SkeletonLoading from "../shared/SkeletonLoading.js";

type Props = {
  user: any;
};

const Navbar = ({ user }: Props) => {
  const currentUser = useRecoilValueLoadable(currentUserState);

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
          <div className={classes.right}>{/* <UserActions /> */}</div>
        </div>
      </header>
    );
  } else {
    return;
  }
};

export default Navbar;
