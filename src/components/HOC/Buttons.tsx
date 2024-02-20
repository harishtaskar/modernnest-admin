import { CSSProperties, MouseEventHandler, ReactNode, useEffect } from "react";
import classes from "./index.module.css";

type Props = {
  name: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  isDisable?: boolean;
  style?: CSSProperties;
};

export const PrimaryButton = ({
  name,
  onClick,
  isLoading,
  isDisable,
  style,
}: Props) => {
  return (
    <button
      className={classes.primaryButton}
      onClick={onClick}
      type="submit"
      disabled={isDisable || isLoading}
      style={
        isDisable
          ? { ...style, cursor: "not-allowed", opacity: "40%" }
          : { ...style }
      }
    >
      {isLoading ? <i className="loading" /> : name}
    </button>
  );
};

export const SecondaryButton = ({ name, onClick, style }: Props) => {
  return (
    <button
      className={classes.secondaryButton}
      onClick={onClick}
      type="reset"
      style={style}
    >
      {name}
    </button>
  );
};

export default PrimaryButton;
