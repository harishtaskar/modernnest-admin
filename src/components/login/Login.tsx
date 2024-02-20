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
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import useAPI from "../../hooks/Other/useAPI.js";
import { PORT } from "../../../config.js";
import { toast } from "react-toastify";
import ExpiredToken from "../screens/not-found/ExpiredToken.js";
import SkeletonLoading from "../shared/SkeletonLoading.js";
import ServerDown from "../screens/not-found/ServerDown.js";

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>;
};

type LoginData = {
  email: string;
  password: string;
};

const Login = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const currentUser = useRecoilValueLoadable(currentUserState);
  const [user, setUser] = useRecoilState(currentUserState);
  const { getRequest } = useAPI();
  const [userDetails, setuserDetails] = useState<LoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (
      localStorage.getItem("authorization")?.length &&
      currentUser.state === "hasValue"
    ) {
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, [currentUser]);

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
      const response = await getRequest(`${PORT}/seller/signin`, userDetails);
      console.log(response);
      if (response.res === "ok") {
        setUser(response.user);
        localStorage.setItem("authorization", response.token);
        toast.success("Login Successfull");
        navigate("/");
      } else {
        toast.error(response.msg);
      }
    },
    [userDetails, localStorage]
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
          password={true}
          onChange={onChangeHandler}
        />
        <div style={{ width: "100%", marginTop: "10px" }}>
          <PrimaryButton name="Login" onClick={onLoginHandler} style={{}} />
        </div>
      </form>
    );
  }, [userDetails, currentUser]);

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
  }, [userDetails, currentUser]);

  if (currentUser.state === "loading") {
    return (
      <div className="background">
        <SkeletonLoading
          style={{ width: "452px", height: "458px", borderRadius: "8px" }}
        />
      </div>
    );
  } else if (currentUser.state === "hasError") {
    if (currentUser.contents.code === "ERR_NETWORK") {
      return <ServerDown />;
    } else {
      return <ExpiredToken />;
    }
  } else if (currentUser.state === "hasValue") {
    return (
      <Modal
        onClose={onClose}
        body={renderLoginBody}
        closeBtn={false}
        backgroundstyle={{ backgroundColor: "transparent" }}
      />
    );
  }
};

export default Login;
