import classes from "./index.module.css";

type Props = {
  label?: string;
  data: string;
  action?: any;
};

const DataLabels = ({ label, data, action }: Props) => {
  return (
    <div className={classes.datalabel}>
      {label && <span className={classes.label}>{label}</span>}
      <div className={classes.datadiv}>
        <span className={classes.data}>{data}</span>
        {action}
      </div>
    </div>
  );
};

export default DataLabels;
