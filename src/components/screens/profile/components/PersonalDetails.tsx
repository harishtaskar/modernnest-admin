import { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";
import { useRecoilValueLoadable } from "recoil";
// @ts-ignore
import { currentUserState } from "./../../../../state/atoms/screen";
import SkeletonLoading from "../../../shared/SkeletonLoading";

type Props = {};

const PersonalDetails = ({}: Props) => {
  const currentUser = useRecoilValueLoadable(currentUserState);
  const user: RegisterData = currentUser.contents;

  const renderBody = useMemo(() => {
    console.log(currentUser);

    return (
      <div className={classes.body}>
        <DataLabels
          data={`${user?.personal?.firstname} ${user?.personal?.lastname}`}
          action={<button className="btn-3">Edit</button>}
          label="Your Name"
        />
        <DataLabels
          data={`${user?.personal?.email}`}
          action={<button className="btn-3">Edit</button>}
          label="Email"
        />
        <DataLabels
          data={`+91 ${user?.personal?.mobile}`}
          action={<button className="btn-3">Edit</button>}
          label="Phone Number"
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

export default PersonalDetails;
