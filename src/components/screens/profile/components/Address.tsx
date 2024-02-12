import React, { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";

type Props = {};

const Address = (props: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="subheading">Address</span>
        <DataLabels
          data="315, Shrinath Nagar, Navagam, Dindoli, Surat - 394210"
          action={<button className="btn-3">Edit</button>}
        />
      </div>
    );
  }, []);
  return <Card body={renderBody} />;
};

export default Address;
