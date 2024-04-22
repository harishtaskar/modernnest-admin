import classes from "./index.module.css";
import MonthlySales from "./MonthlySales";
import MonthWiseSales from "./MonthWiseSales";
import JSONdata from "../data.json";
import months from "../months.json";
import CategoryWiseSales from "./CategoryWiseSales";
import ProductSummary from "./ProductSummary";
import { useRecoilState } from "recoil";
//@ts-ignore
import { dashboardData } from "../../../../state/atoms/screen.js";
import { useEffect } from "react";

const Charts = () => {
  const [dashboardDataState, setDashboardDataState] =
    useRecoilState<any>(dashboardData);

  useEffect(() => {
    if (dashboardDataState === undefined) {
      setDashboardDataState(JSONdata);
    }
  }, []);

  return (
    <div className={classes.charts}>
      <div className={classes.row}>
        <MonthlySales data={dashboardDataState} months={months} />
        <MonthWiseSales data={dashboardDataState} months={months} />
      </div>
      <div className={classes.row}>
        <CategoryWiseSales data={dashboardDataState} months={months} />
        <ProductSummary data={dashboardDataState} months={months} />
      </div>
    </div>
  );
};

export default Charts;
