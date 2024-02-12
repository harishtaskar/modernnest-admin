import classes from "./index.module.css";
import { useRecoilValue } from "recoil";
//@ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";

type Props = {};

const Navbar = (props: Props) => {
  const currentUser = useRecoilValue(currentUserState);

  if (currentUser) {
    return (
      <header className={`${classes.header} ${"flex-row-center"}`}>
        <div className={`${classes.main}`}>
          <div className={classes.left}>
            <span className={classes.brand}>Hello, Admin 👋</span>
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
