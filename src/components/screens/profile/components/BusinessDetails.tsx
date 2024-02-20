import classes from "./index.module.css";
import { useCallback, useMemo } from "react";
import DataLabels from "../../../HOC/DataLabels";
import Card from "../../../HOC/Card";
import useUsers from "../../../../hooks/Users/useUsers";

type Props = {
  user: RegisterData;
};

const BusinessDetails = ({ user }: Props) => {
  const { getImageViaUrl } = useUsers();

  const documentHandler = useCallback(async (path: string) => {
    const url: any = await getImageViaUrl(path);
    window.open(url, "_blank");
  }, []);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="subheading">Business Details</span>
        {Object.entries(user.business).map((item: any[], index: number) => {
          console.log(item);
          if (typeof item[1] === "object") {
            return (
              <DataLabels
                key={index}
                data={item[1].name}
                label={item[0]}
                action={
                  <button
                    className="btn-3"
                    onClick={() => documentHandler(item[1]?.path)}
                  >
                    View
                  </button>
                }
              />
            );
          } else {
            return <DataLabels data={item[1]} label={item[0]} />;
          }
        })}
      </div>
    );
  }, [user]);

  return <Card body={renderBody} />;
};

export default BusinessDetails;
