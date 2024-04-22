import { useEffect, useMemo, useState } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import Chart from "react-apexcharts";
import { useRecoilValue } from "recoil";
// @ts-ignore
import { darkmodeState } from "./../../../../state/atoms/screen";
type Props = {
  data: object;
  months: any;
};

const ProductSummary = ({ months, data }: Props) => {
  const [sales, setSales] = useState<number[]>([]);
  const darkmode = useRecoilValue(darkmodeState);
  useEffect(() => {
    if (data !== undefined) {
      Object.values(data)?.map((item: any) => {
        setSales((prev) => {
          return [
            ...prev,
            item.sales.reduce(
              (acc: number, current: number) =>
                Math.round(acc + current / 1000),
              0
            ),
          ];
        });
      });
    }
  }, [data]);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <div className={classes.header}>
          <div>
            <span className="subheading">Product Summary</span>
            {"  "}
            <span className="normal-text">(in Thousand)</span>
          </div>
        </div>
        <div className={classes.chart}>
          <Chart
            options={{
              chart: { id: "monthly-sales", background: "var(--white)" },
              xaxis: {
                categories: months,
              },
              theme: {
                mode: darkmode ? "dark" : "light",
              },
            }}
            series={[
              {
                name: "chart-1",
                data: sales || "",
              },
            ]}
            type="bar"
            height={225}
          />
        </div>
      </div>
    );
  }, [sales, darkmode]);
  return <Card body={renderBody} style={{ flex: 4 }} />;
};

export default ProductSummary;
