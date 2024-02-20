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
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
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
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { currentUserState } from "./../../state/atoms/screen.js";
import useAPI from "../../hooks/Other/useAPI.js";
import { PORT } from "../../../config.js";
import ExpiredToken from "../screens/not-found/ExpiredToken.js";
import SkeletonLoading from "../shared/SkeletonLoading.js";
import ServerDown from "../screens/not-found/ServerDown.js";

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
  const currentUser = useRecoilValueLoadable(currentUserState);
  const { postRequest } = useAPI();
  const registerData: RegisterData = useRecoilValue(registrationDataState);
  const [activeForm, setActiveForm] = useRecoilState<Register | any>(
    activeRegistrationForm
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("authorization")?.length &&
      currentUser.state === "hasValue"
    ) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, [currentUser]);

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
        registerData?.business?.name &&
        registerData?.business?.registration &&
        registerData?.business?.taxid &&
        registerData?.business?.contact &&
        registerData?.business?.email
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
        registerData?.store?.name &&
        registerData?.store?.description &&
        registerData?.store?.shiping &&
        registerData?.store?.logo &&
        registerData?.store?.estimatedeliverytime
      ) {
        setActiveForm({ ...activeForm, storedetails: true, name: "address" });
      } else {
        toast.error("Please fill up all fields");
      }
    } // Checking if submitted form is second address details form
    else if (activeForm.name === "address") {
      if (
        registerData?.address?.personaladdress &&
        registerData?.address?.streetaddress &&
        registerData?.address?.pin?.toString()?.length >= 6 &&
        registerData?.address?.country &&
        registerData?.address?.state &&
        registerData?.address?.city
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
          const apiResponse = await postRequest(`${PORT}/seller/signup`, {
            user: registerData,
          });
          console.log(apiResponse);
          if (apiResponse?.res === "ok") {
            toast.success("🚀 Registration Successfull");
            navigate("/signin");
          } else {
            toast.error(apiResponse?.msg);
            setActiveForm({
              ...activeForm,
              name: "businessdetails",
            });
          }
        }
      } else {
        toast.error("Please fill up all fields");
      }
    }
  }, [activeForm, registerData, buttonLoading, postRequest, useAPI]);

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

  if (currentUser.state === "loading") {
    return (
      <div className="background">
        <SkeletonLoading
          style={{ width: "580px", height: "578px", borderRadius: "8px" }}
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
        body={renderRegisterBody}
        closeBtn={false}
        backgroundstyle={{ backgroundColor: "transparent" }}
      />
    );
  }
};

export default Registration;
