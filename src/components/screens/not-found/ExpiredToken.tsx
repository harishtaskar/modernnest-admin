import { useCallback } from "react";
import PrimaryButton from "../../HOC/Buttons";
import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";

type Props = {};

const ExpiredToken = (props: Props) => {
  const navigate = useNavigate();
  const loginHandler = useCallback(() => {
    localStorage.setItem("authorization", "");
    navigate("/signin");
    window.location.reload();
  }, []);

  return (
    <div className={classes.notfound}>
      <div className={classes.notfounddiv}>
        <a
          href={"/signin"}
          className="heading"
          style={{ fontSize: "35px", textDecoration: "none" }}
        >
          Oops!
        </a>
        <div>
          <span className={classes.subheading} style={{ fontSize: "18px" }}>
            Your token has Expired, Please Sign in again
          </span>
        </div>
        <PrimaryButton
          name="Sign in"
          onClick={() => loginHandler()}
          style={{ width: "fit-content" }}
        />
      </div>
    </div>
  );
};

export default ExpiredToken;
