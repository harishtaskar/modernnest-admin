import React, { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
// @ts-ignore
import { currentUserState } from "./../../../../state/atoms/screen";

type Props = {};

const Address = (props: Props) => {
  const user: RegisterData = useRecoilValue(currentUserState);
  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="subheading">Address</span>
        <DataLabels
          data={`${user.address.personaladdress} ${user.address.streetaddress} ${user.address.city} - ${user.address.pin} ${user.address.state} ${user.address.country}`}
          action={<button className="btn-3">Edit</button>}
        />
      </div>
    );
  }, []);
  return <Card body={renderBody} />;
};

export default Address;
