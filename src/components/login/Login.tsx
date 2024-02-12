import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import classes from "./index.module.css";
import style from "../HOC/index.module.css";
import InputText from "../HOC/InputText";
import PrimaryButton from "../HOC/Buttons";
//@ts-ignore
import { activeModal } from "./../../state/atoms/screen";
//@ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";
import Modal from "../render-model/Modal";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>;
};

type LoginData = {
  email: string;
  password: string;
};

const Login = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState);
  const [userDetails, setuserDetails] = useState<LoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const onChangeHandler = useCallback(
    (key: string, value: string) => {
      setuserDetails((prev: any) => {
        return { ...prev, [key]: value };
      });
    },
    [userDetails]
  );

  const onLoginHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      console.log(userDetails);
    },
    [userDetails]
  );

  const loginform = useMemo(() => {
    return (
      <form className={classes.loginform}>
        <InputText
          id="email"
          inputType="email"
          label="Email"
          placeHolder=""
          warning="email format is invalid"
          onChange={onChangeHandler}
        />
        <InputText
          id="password"
          inputType="password"
          label="Password"
          placeHolder=""
          warning="invalid password"
          password={true}
          minLength={8}
          onChange={onChangeHandler}
        />
        <div style={{ width: "100%", marginTop: "10px" }}>
          <PrimaryButton name="Login" onClick={onLoginHandler} style={{}} />
        </div>
      </form>
    );
  }, [userDetails]);

  const renderLoginBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <div className={classes.head}>
          <span className={"heading"}>Login</span>
          <p className={"normal-text"}>
            Fill in the Login data. All you need to verify is e-mail and
            password
          </p>
        </div>
        {loginform}
        <div className={style.otheroption}>
          Don't have account ?
          <p className={style.link} onClick={() => navigate("/signup")}>
            Sign up
          </p>
        </div>
      </div>
    );
  }, [userDetails]);

  return (
    <Modal
      onClose={onClose}
      body={renderLoginBody}
      closeBtn={false}
      backgroundstyle={{ backgroundColor: "transparent" }}
    />
  );
};

export default Login;
