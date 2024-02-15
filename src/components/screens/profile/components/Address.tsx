import React, { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
// @ts-ignore
import { currentUserState } from "./../../../../state/atoms/screen";
import SkeletonLoading from "../../../shared/SkeletonLoading";

type Props = {};

const Address = (props: Props) => {
  const currentUser = useRecoilValueLoadable(currentUserState);
  const user: RegisterData = currentUser.contents;
  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="subheading">Address</span>
        <DataLabels
          data={`${user?.address?.personaladdress} ${user?.address?.streetaddress} ${user?.address?.city} - ${user?.address?.pin} ${user?.address?.state} ${user?.address?.country}`}
          action={<button className="btn-3">Edit</button>}
        />
      </div>
    );
  }, []);
  if (currentUser.state === "loading") {
    return <SkeletonLoading style={{ width: "80px", height: "80px" }} />;
  } else if (currentUser.state === "hasValue") {
    return <Card body={renderBody} />;
  } else if (currentUser.state === "hasError") {
    return <>Error Occured</>;
  }
};

export default Address;
