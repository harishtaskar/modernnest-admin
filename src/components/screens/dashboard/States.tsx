import React, { useMemo } from "react";
import Card from "../../HOC/Card";
import classes from "./index.module.css";

type Props = {
  data: any;
};

type Data = {
  title: string;
  subtitle: string;
};

const States = ({ data }: Props) => {
  const renderBody = useMemo(() => {
    return (
      <div className={classes["state-body"]}>
        {data?.map((item: Data, index: number) => {
          return (
            <>
              <div className={classes.module}>
                <span className="text1">{item.title}</span>
                <p className="text2">{item.subtitle}</p>
              </div>
              {index !== data?.length - 1 && <i className={classes.line} />}
            </>
          );
        })}
      </div>
    );
  }, []);
  return <Card body={renderBody} />;
};

export default States;
