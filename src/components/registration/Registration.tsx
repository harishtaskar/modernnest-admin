"use client";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import classes from "./index.module.css";
import style from "../login/index.module.css";
import share from "../HOC/index.module.css";
import Modal from "../render-model/Modal";
import PersonalDataForm from "./PersonalDataForm";
import { useRecoilState, useRecoilValue } from "recoil";
import AddressForm from "./AddressForm";
import UserDetailsForm from "./UserDetailsForm";
import Breadcrumb from "./BreadCrumb";
import PrimaryButton from "../HOC/Buttons";
import { toast } from "react-toastify";
// @ts-ignore
import { activeRegistrationForm } from "./state/index.js";
// @ts-ignore
import { registrationDataState } from "./state/index.js";
// @ts-ignore
import { activeModal } from "../../state/atoms/screen.js";
import BussinessDetails from "./BussinessDetails.js";
import StoreDetails from "./StoreDetails.js";
import useUsers from "../../hooks/Users/useUsers.js";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { currentUserState } from "./../../state/atoms/screen.js";

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>;
};
type Register = {
  name: string;
  personaldata: boolean;
  address: boolean;
  userdetails: boolean;
};

const Registration = ({ onClose }: Props) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const currentUser = useRecoilValue(currentUserState);
  const { onSellerRegister } = useUsers();
  const registerData: RegisterData = useRecoilValue(registrationDataState);
  const [activeForm, setActiveForm] = useRecoilState<Register | any>(
    activeRegistrationForm
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  // rendering appropreate form of registering data
  const renderForms = useMemo(() => {
    console.log(registerData);
    switch (activeForm.name) {
      case "personal":
        return <PersonalDataForm title="Personal Details" />;
      case "businessdetails":
        return <BussinessDetails title="Business Details" />;
      case "storedetails":
        return <StoreDetails title="Store Details" />;
      case "address":
        return <AddressForm title="Store Address" />;
      case "userdetails":
        return <UserDetailsForm />;
      default:
        return <PersonalDataForm />;
    }
  }, [activeForm, registerData]);

  // onSubmit handler when user submit any of the registration forms
  const onSubmitHandler = useCallback(async () => {
    // Checking if submitted form is first personal details form
    if (activeForm.name === "personal") {
      if (
        registerData.personal.firstname &&
        registerData.personal.lastname &&
        registerData.personal.mobile?.toString()?.length === 10 &&
        registerData.personal.email
      ) {
        setActiveForm({
          ...activeForm,
          personaldata: true,
          name: "businessdetails",
        });
      } else {
        toast.error("Please fill up all fields");
      }
    } else if (activeForm.name === "businessdetails") {
      if (
        registerData.business.name &&
        registerData.business.registration &&
        registerData.business.taxid &&
        registerData.business.contact &&
        registerData.business.email
      ) {
        setActiveForm({
          ...activeForm,
          businessdetails: true,
          name: "storedetails",
        });
      } else {
        toast.error("Please fill up all fields");
      }
    } else if (activeForm.name === "storedetails") {
      if (
        registerData.store.name &&
        registerData.store.description &&
        registerData.store.shiping &&
        registerData.store.logo &&
        registerData.store.estimatedeliverytime
      ) {
        setActiveForm({ ...activeForm, storedetails: true, name: "address" });
      } else {
        toast.error("Please fill up all fields");
      }
    } // Checking if submitted form is second address details form
    else if (activeForm.name === "address") {
      if (
        registerData.address.personaladdress &&
        registerData.address.streetaddress &&
        registerData.address.pin?.toString()?.length >= 6 &&
        registerData.address.country &&
        registerData.address.state &&
        registerData.address.city
      ) {
        setActiveForm({ ...activeForm, address: true, name: "userdetails" });
      } else {
        toast.error("Please fill up all fields");
      }
    } // Checking if submitted form is third user details form
    else if (activeForm.name === "userdetails") {
      if (
        registerData?.idverification &&
        registerData?.business.document &&
        registerData?.password
      ) {
        if (registerData?.password !== registerData.confirmpassword) {
          toast.error("Password Not Matched");
        } else {
          // setButtonLoading(true);

          const res = await onSellerRegister(registerData);
          console.log(res);

          // setButtonLoading(false);
        }
      } else {
        toast.error("Please fill up all fields");
      }
    }
  }, [activeForm, registerData, buttonLoading]);

  // Rendering Registration modal body
  const renderRegisterBody = useMemo(() => {
    return (
      <div className={classes.registerbody}>
        <div className={style.head}>
          <span className={style.heading}>Registration</span>
          <p className={style.smallText}>For Seller</p>
        </div>
        <Breadcrumb />
        <div className={classes.form}>{renderForms}</div>
        <PrimaryButton
          name={activeForm.name === "userdetails" ? "Submit" : "Next"}
          onClick={() => onSubmitHandler()}
          isLoading={buttonLoading}
        />
        <div className={share.otheroption}>
          Already have account ?{" "}
          <p className={share.link} onClick={() => navigate("/signin")}>
            Log in
          </p>
        </div>
      </div>
    );
  }, [activeForm, registerData]);
  return (
    <Modal
      onClose={onClose}
      body={renderRegisterBody}
      closeBtn={false}
      backgroundstyle={{ backgroundColor: "transparent" }}
    />
  );
};

export default Registration;
