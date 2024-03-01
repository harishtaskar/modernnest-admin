import { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";
import SkeletonLoading from "../../../shared/SkeletonLoading";

type Props = {
  user: RegisterData;
};

const PersonalDetails = ({ user }: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="subheading">Personal Details</span>
        {!user && (
          <SkeletonLoading
            style={{
              width: "100%",
              margin: "4px 0px",
              height: "15px",
              display: "block",
              borderRadius: "8px",
            }}
          />
        )}
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
