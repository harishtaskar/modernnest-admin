import { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";

type Props = {
  user: RegisterData;
};

const PersonalDetails = ({ user }: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="subheading">Personal Details</span>
        <DataLabels
          data={`${user?.personal?.firstname} ${user?.personal?.lastname}`}
          label="Your Name"
        />
        <DataLabels data={`${user?.personal?.email}`} label="Email" />
        <DataLabels
          data={`+91 ${user?.personal?.mobile}`}
          label="Phone Number"
        />
      </div>
    );
  }, [user]);

  return <Card body={renderBody} />;
};

export default PersonalDetails;
