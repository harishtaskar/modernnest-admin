import { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";

type Props = {};

const LegalDetails = ({}: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="subheading">Legal</span>
        <DataLabels
          data="KYC Status"
          action={<button className="btn-3 success">Verified</button>}
        />
        <DataLabels
          data="KYC Details"
          action={<button className="btn-3">View</button>}
        />
      </div>
    );
  }, []);
  return <Card body={renderBody} />;
};

export default LegalDetails;
