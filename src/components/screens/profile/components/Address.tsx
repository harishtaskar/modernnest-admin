import { useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";

type Props = {
  user: RegisterData;
};

const Address = ({ user }: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="subheading">Address</span>
        <DataLabels
          data={`${user?.address?.personaladdress} ${user?.address?.streetaddress} ${user?.address?.city} - ${user?.address?.pin} ${user?.address?.state} ${user?.address?.country}`}
        />
      </div>
    );
  }, [user]);

  return <Card body={renderBody} />;
};

export default Address;
