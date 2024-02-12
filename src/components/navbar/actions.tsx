"use client";
import classes from "./index.module.css";
import { Link } from "react-router-dom";
// @ts-ignore

const UserActions = () => {
  const currentUser = true;

  if (currentUser) {
    return (
      <div className={classes.actionsWeb}>
        <div className={classes.actions}>
          <i className={`${"ri-user-line"} ${classes.icons}`} />
          <Link to={"/signin"} className={classes.primaryText}>
            Login
          </Link>
          /
          <Link to={"/signup"} className={classes.primaryText}>
            Register
          </Link>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default UserActions;
