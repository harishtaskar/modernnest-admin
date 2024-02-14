import classes from "./index.module.css";
import InputText from "../HOC/InputText";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
// @ts-ignore
import { registrationDataState } from "./state/index.js";

type Props = {
  title?: string;
};

const PersonalDataForm = ({ title }: Props) => {
  const [regData, setRegData] = useRecoilState<RegisterData>(
    registrationDataState
  );

  const inputChangeHandler = useCallback((key: string, value: any) => {
    setRegData((prev: RegisterData) => {
      return { ...prev, personal: { ...prev.personal, [key]: value } };
    });
  }, []);

  return (
    <form method="post" action="submit" className={classes.innerForm}>
      <span className={classes.subheading}>{title}</span>
      <div className={classes.horizontaldiv}>
        <InputText
          id="firstname"
          inputType="text"
          label="First Name"
          placeHolder=""
          warning="first name is required"
          onChange={inputChangeHandler}
          value={regData?.personal?.firstname}
        />
        <InputText
          id="lastname"
          inputType="text"
          label="Last Name"
          placeHolder=""
          warning="last name is required"
          onChange={inputChangeHandler}
          value={regData?.personal?.lastname}
        />
      </div>
      <InputText
        id="mobile"
        inputType="number"
        label="Mobile"
        placeHolder=""
        warning="mobile number should be 10 digits"
        minLength={10}
        maxLength={10}
        onChange={inputChangeHandler}
        value={regData?.personal?.mobile}
      />
      <InputText
        id="email"
        inputType="email"
        label="Email"
        placeHolder=""
        warning="Email is required"
        onChange={inputChangeHandler}
        value={regData?.personal?.email}
      />
    </form>
  );
};

export default PersonalDataForm;
