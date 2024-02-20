import classes from "./index.module.css";
import Card from "../../HOC/Card";

type Props = {};

const Settings = (props: Props) => {
  return (
    <div className={classes.screen}>
      <div className={classes.body}>
        <Card
          body={
            <div className={classes.cardBody}>
              <span className="heading">Settings</span>
            </div>
          }
          style={{ height: "calc(100vh - 141px)" }}
        />
      </div>
    </div>
  );
};

export default Settings;
