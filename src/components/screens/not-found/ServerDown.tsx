import classes from "./index.module.css";
import cloud from "../../../../public/assets/images/icons/cloud.json";
import Lottie from "lottie-react";

type Props = {};

const ServerDown = (props: Props) => {
  return (
    <div className={classes.notfound}>
      <div className={classes.notfounddiv}>
        <div
          className={classes.head}
          style={{ fontSize: "35px", textDecoration: "none" }}
        >
          <span className="heading">Oops!</span>
          <div style={{ width: "100px", height: "100px" }}>
            <Lottie animationData={cloud} />
          </div>
        </div>
        <div>
          <span className={classes.subheading} style={{ fontSize: "18px" }}>
            Server is down, Please try again later.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServerDown;
