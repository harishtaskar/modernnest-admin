import { useMemo } from "react";
import Card from "../../HOC/Card";
import classes from "./index.module.css";
//@ts-ignore
import user from "../../../../public/assets/images/user.svg";
import PersonalDetails from "./components/PersonalDetails";
import LegalDetails from "./components/LegalDetails";
import Address from "./components/Address";

type Props = {};

const Profile = ({}: Props) => {
  const renderProfile = useMemo(() => {
    return (
      <div className={classes.cardBody}>
        <div className={classes.top}>
          <img src={user} alt="user-proifle" className={classes.profile} />
          <button className="btn-3">Upload photo</button>
        </div>
        <div className={classes.details}>
          <PersonalDetails />
          <Address />
          <LegalDetails />
        </div>
      </div>
    );
  }, []);

  const renderProfileDetails = useMemo(() => {
    return (
      <div className={classes.cardBody}>
        <div className={classes.companyDetails}>
          <PersonalDetails />
          <PersonalDetails />
          <PersonalDetails />
        </div>
      </div>
    );
  }, []);

  return (
    <div className={classes.screen}>
      <div className={classes.body}>
        <Card body={renderProfile} style={{ width: "fit-content" }} />
        <Card body={renderProfileDetails} style={{ width: "fit-content" }} />
        <Card body={renderProfileDetails} style={{ width: "fit-content" }} />
      </div>
    </div>
  );
};

export default Profile;
