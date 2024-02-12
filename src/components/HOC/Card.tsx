import React, { CSSProperties, ReactNode } from "react";
import classes from "./index.module.css";

type Props = {
  body: ReactNode;
  style?: CSSProperties;
};

const Card = ({ body, style }: Props) => {
  return (
    <div className={classes.card} style={style}>
      {body}
    </div>
  );
};

export default Card;
