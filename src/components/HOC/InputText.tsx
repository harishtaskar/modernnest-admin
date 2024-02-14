import { CSSProperties, useCallback, useMemo, useState } from "react";
import classes from "./index.module.css";
import { LoadingIcon } from "../shared/loadingIcon";

type Props = {
  id: string;
  label?: string;
  inputType?: string;
  placeHolder?: string;
  warning?: string;
  password?: boolean;
  require?: boolean;
  width?: string;
  minLength?: number;
  maxLength?: number;
  onChange: Function;
  value?: any;
  filename?: any;
  style?: CSSProperties;
  fileloading?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const InputText = ({
  id,
  label,
  inputType,
  placeHolder,
  warning,
  password,
  require = true,
  width,
  minLength = 0,
  maxLength = 100,
  onChange,
  value,
  filename,
  style,
  onBlur,
  fileloading = false,
}: Props) => {
  //Validating email if type is email
  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const [type, setType] = useState(inputType);
  const [warningState, setWarningState] = useState<any>("");

  const onInputChangeHandler = useCallback((e: any) => {
    if (
      e.target.value.toString().length < minLength ||
      e.target.value.toString().length > maxLength
    ) {
      setWarningState(warning);
      onChange(id, null);
    } else {
      if (type === "email") {
        if (validateEmail(e.target.value)) {
          setWarningState("");
          onChange(id, e.target.value);
        } else {
          setWarningState("Invalid Email formate");
          onChange(id, null);
        }
      } else {
        if (type === "file") {
          return onChange(id, e);
        }

        setWarningState("");
        onChange(id, e.target.value);
      }
    }
  }, []);

  const renderEyeButton = useMemo(() => {
    if (type === "password") {
      return (
        <i
          className={`${classes.eyediv} ${"ri-eye-off-line"}`}
          onClick={() => setType("text")}
        />
      );
    } else {
      return (
        <i
          className={`${classes.eyediv} ${"ri-eye-line"}`}
          onClick={() => setType("password")}
        />
      );
    }
  }, [type]);
  return (
    <div className={classes.inputText}>
      <label className={classes.inputLabel} htmlFor={id}>
        {label} {require && <i style={{ color: "red" }}>*</i>}
      </label>
      {type === "file" && (
        <label className={classes.inputLabel2} htmlFor={id} id={type}>
          {fileloading ? <LoadingIcon /> : filename || "Choose File"}
        </label>
      )}
      <div className={classes.inputdiv}>
        <input
          onBlur={onBlur}
          className={`${classes.input} ${
            warningState !== "" ? classes.inputerror : ""
          } `}
          value={value}
          type={type}
          name={id}
          placeholder={placeHolder}
          id={id}
          required={require ?? true}
          onChange={onInputChangeHandler}
          style={{
            width: `${width ? `calc(${width} - 34px)` : "calc(100% - 34px)"}`,
            borderStyle: `${type === "file" ? "dashed" : "solid"}`,
            ...style,
          }}
          minLength={minLength}
          maxLength={maxLength}
        />
        {password && renderEyeButton}
      </div>
      <span className={classes.warning}>{warningState}</span>
    </div>
  );
};

export default InputText;
