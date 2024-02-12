import { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";

type Props = {};

const PersonalDetails = ({}: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <DataLabels
          data="Harish Taskar"
          action={<button className="btn-3">Edit</button>}
          label="Your Name"
        />
        <DataLabels
          data="Harishtaskar001@gmail.com"
          action={<button className="btn-3">Edit</button>}
          label="Email"
        />
        <DataLabels
          data="+91 8238795994"
          action={<button className="btn-3">Edit</button>}
          label="Phone Number"
        />
      </div>
    );
  }, []);
  return <Card body={renderBody} />;
};

export default PersonalDetails;
