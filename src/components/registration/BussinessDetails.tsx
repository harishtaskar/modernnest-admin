import classes from "./index.module.css";
import InputText from "../HOC/InputText";
import { useSetRecoilState } from "recoil";
// @ts-ignore
import { registrationDataState } from "./state/index.js";
import { useCallback } from "react";

type Props = {
  title?: string;
};

const BussinessDetails = ({ title }: Props) => {
  const setRegistrationState = useSetRecoilState(registrationDataState);

  const registrationStateHandler = useCallback((key: string, value: any) => {
    setRegistrationState((prev: any) => {
      return { ...prev, business: { ...prev.business, [key]: value } };
    });
  }, []);

  return (
    <form method="post" action="submit" className={classes.innerForm}>
      <span className={classes.subheading}>{title}</span>
      <InputText
        id="name"
        inputType="text"
        label="Business Name"
        placeHolder=""
        warning="business name is required"
        onChange={registrationStateHandler}
      />
      <InputText
        id="registration"
        inputType="text"
        label="Registration Number"
        placeHolder=""
        warning="Registration Number is Required"
        onChange={registrationStateHandler}
      />
      <InputText
        id="taxid"
        inputType="text"
        label="TAXID Number"
        placeHolder="GSTIN/TAN"
        require={false}
        onChange={registrationStateHandler}
        style={{ textTransform: "uppercase" }}
      />
      <InputText
        id="contact"
        inputType="number"
        label="Contact"
        placeHolder=""
        minLength={10}
        maxLength={10}
        warning="Contact should be exact 10 digits long"
        onChange={registrationStateHandler}
      />
      <InputText
        id="email"
        inputType="email"
        label="Email"
        placeHolder=""
        warning="Bussiness Email is required"
        onChange={registrationStateHandler}
      />
    </form>
  );
};

export default BussinessDetails;
