import classes from "./index.module.css";
import MonthlySales from "./MonthlySales";
import MonthWiseSales from "./MonthWiseSales";
import data from "../data.json";
import CategoryWiseSales from "./CategoryWiseSales";
import ProductSummary from "./ProductSummary";

const Charts = () => {
  return (
    <div className={classes.charts}>
      <div className={classes.row}>
        <MonthlySales data={data} />
        <MonthWiseSales data={data} />
      </div>
      <div className={classes.row}>
        <CategoryWiseSales data={data} />
        <ProductSummary data={data} />
      </div>
    </div>
  );
};

export default Charts;
