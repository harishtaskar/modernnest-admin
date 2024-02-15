import { useCallback } from "react";
import PrimaryButton from "../../HOC/Buttons";
import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import error from "../../../../public/assets/images/icons/error.json";
import cloud from "../../../../public/assets/images/icons/cloud.json";

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
        <div className={classes.head}>
          <a
            className="heading"
            style={{ fontSize: "35px", textDecoration: "none" }}
          >
            Oops!
          </a>
          <div style={{ width: "80px", height: "80px" }}>
            <Lottie animationData={error} />
          </div>
        </div>
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
