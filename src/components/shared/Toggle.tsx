import { MouseEventHandler } from "react";
import classes from "./toggle.module.css";

type Props = {
  onClick: MouseEventHandler<HTMLLabelElement>;
  value?: boolean;
};

const Toggle = ({ onClick, value }: Props) => {
  return (
    <>
      <input
        className={classes.input}
        type="checkbox"
        id="switch"
        // defaultChecked={value}
        checked={value}
      />
      <label className={classes.label} htmlFor="switch" onClick={onClick}>
        Toggle
      </label>
    </>
  );
};

export default Toggle;
