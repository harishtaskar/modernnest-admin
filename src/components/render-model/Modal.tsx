import React, { CSSProperties, MouseEventHandler, ReactElement } from "react";
import classes from "./index.module.css";

type Props = {
  body: ReactElement;
  onClose: MouseEventHandler<HTMLButtonElement>;
  closeBtn?: boolean;
  modalstyle?: CSSProperties;
  backgroundstyle?: CSSProperties;
};

const Modal = ({
  body,
  onClose,
  closeBtn = true,
  backgroundstyle,
  modalstyle,
}: Props) => {
  return (
    <div className={classes.background} style={backgroundstyle}>
      <div className={classes.modal} style={modalstyle}>
        {closeBtn && (
          <button className={classes["close-btn-user"]} onClick={onClose}>
            <i className="ri-close-line ri-xl"></i>
          </button>
        )}
        <>{body}</>
      </div>
    </div>
  );
};

export default Modal;
