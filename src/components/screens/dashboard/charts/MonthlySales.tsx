import { useEffect, useMemo, useState } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import Chart from "react-apexcharts";
import { useSearchParams } from "react-router-dom";
type Props = {
  data: object;
};

const MonthlySales = ({ data }: Props) => {
  const [sales, setSales] = useState<number[]>([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    Object.values(data).map((item: any) => {
      setSales((prev) => {
        return [
          ...prev,
          item.sales.reduce(
            (acc: number, current: number) => Math.round(acc + current / 1000),
            0
          ),
        ];
      });
    });
  }, []);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <div className={classes.header}>
          <div>
            <span className="subheading">Monthly Sales</span>
            {"  "}
            <span className="normal-text">(in Thousand)</span>
          </div>
        </div>
        <div className={classes.chart}>
          <Chart
            options={{
              plotOptions: {
                bar: {
                  distributed: true,
                },
              },
              theme: {
                //@ts-ignore
                mode: searchParams.get("theme"),
                // palette: "palette6",
              },
              stroke: { lineCap: "round" },
              chart: { id: "monthly-sales", background: "var(--white)" },
              xaxis: {
                categories: Object.keys(data),
              },
            }}
            series={[
              {
                name: "chart-1",
                data: sales,
                color: "#9C27B0",
              },
            ]}
            type="bar"
            height={220}
          />
        </div>
      </div>
    );
  }, [sales, searchParams.get("theme")]);
  return <Card body={renderBody} style={{ flex: 3 }} />;
};

export default MonthlySales;