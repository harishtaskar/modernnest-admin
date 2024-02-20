import { useCallback, useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";
import useUsers from "../../../../hooks/Users/useUsers";

type Props = {
  user: RegisterData;
};

const LegalDetails = ({ user }: Props) => {
  const { getImageViaUrl } = useUsers();

  const documentHandler = useCallback(async (path: string) => {
    const url: any = await getImageViaUrl(path);
    window.open(url, "_blank");
  }, []);

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
        <DataLabels
          data={user.idverification.name}
          label={"ID Verification"}
          action={
            <button
              className="btn-3"
              onClick={() => documentHandler(user.idverification.path)}
            >
              View
            </button>
          }
        />
      </div>
    );
  }, [user]);
  return <Card body={renderBody} />;
};

export default LegalDetails;
