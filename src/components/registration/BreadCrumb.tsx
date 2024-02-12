import classes from "./index.module.css";
import { useRecoilValue } from "recoil";
// @ts-ignore
import { activeRegistrationForm } from "./state/index.js";

type Register = {
  name: string;
  personaldata: boolean;
  address: boolean;
  businessdetails: boolean;
  storedetails: boolean;
  userdetails: boolean;
};

const Breadcrumb = () => {
  const activeForm = useRecoilValue<Register>(activeRegistrationForm);
  return (
    <div className={classes.breadcrumb}>
      {/* Dott */}
      <i
        className={`${
          activeForm.personaldata
            ? `${classes.circle}`
            : `${classes.circleNotCompleted}`
        } ${activeForm.name === "personal" && classes.circleActive}`}
      />
      {/* Line */}
      <i
        className={
          activeForm.personaldata
            ? `${classes.line}`
            : `${classes.lineNotCompleted}`
        }
      />
      {/* Dott */}
      <i
        className={`${
          activeForm.businessdetails
            ? `${classes.circle}`
            : `${classes.circleNotCompleted}`
        } ${activeForm.name === "businessdetails" && classes.circleActive}`}
      />
      {/* Line */}
      <i
        className={
          activeForm.businessdetails
            ? `${classes.line}`
            : `${classes.lineNotCompleted}`
        }
      />
      {/* Dott */}
      <i
        className={`${
          activeForm.storedetails
            ? `${classes.circle}`
            : `${classes.circleNotCompleted}`
        } ${activeForm.name === "storedetails" && classes.circleActive}`}
      />
      {/* Line */}
      <i
        className={
          activeForm.storedetails
            ? `${classes.line}`
            : `${classes.lineNotCompleted}`
        }
      />
      {/* Dott */}
      <i
        className={`${
          activeForm.address
            ? `${classes.circle}`
            : `${classes.circleNotCompleted}`
        } ${activeForm.name === "address" && classes.circleActive}`}
      />
      {/* Line */}
      <i
        className={
          activeForm.address ? `${classes.line}` : `${classes.lineNotCompleted}`
        }
      />
      {/* Dott */}
      <i
        className={`${
          activeForm.userdetails
            ? `${classes.circle}`
            : `${classes.circleNotCompleted}`
        } ${activeForm.name === "userdetails" && classes.circleActive}`}
      />
    </div>
  );
};

export default Breadcrumb;
