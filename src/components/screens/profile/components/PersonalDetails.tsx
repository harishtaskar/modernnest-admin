import { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";
import { useRecoilValueLoadable } from "recoil";
// @ts-ignore
import { currentUserState } from "./../../../../state/atoms/screen";

type Props = {};

const PersonalDetails = ({}: Props) => {
  const currentUser = useRecoilValueLoadable(currentUserState);
  const user: RegisterData = currentUser.contents;

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <DataLabels
          data={`${user.personal.firstname} ${user.personal.lastname}`}
          action={<button className="btn-3">Edit</button>}
          label="Your Name"
        />
        <DataLabels
          data={`${user.personal.email}`}
          action={<button className="btn-3">Edit</button>}
          label="Email"
        />
        <DataLabels
          data={`+91 ${user.personal.mobile}`}
          action={<button className="btn-3">Edit</button>}
          label="Phone Number"
        />
      </div>
    );
  }, []);
  return <Card body={renderBody} />;
};

export default PersonalDetails;
