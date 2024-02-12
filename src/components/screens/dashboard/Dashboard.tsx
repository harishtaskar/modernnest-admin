import classes from "./index.module.css";
import States from "./States";
import Charts from "./charts/Charts";

type Props = {};

const states = [
  {
    title: "750K",
    subtitle: "Sales",
  },
  {
    title: "7,500",
    subtitle: "Cancels",
  },
  {
    title: "7,500",
    subtitle: "Total Earned",
  },
  {
    title: "575",
    subtitle: "Distributions",
  },
  {
    title: "35%",
    subtitle: "Growth",
  },
];

const Dashboard = ({}: Props) => {
  return (
    <div className={classes.screen}>
      <States data={states} />
      <Charts />
    </div>
  );
};

export default Dashboard;
