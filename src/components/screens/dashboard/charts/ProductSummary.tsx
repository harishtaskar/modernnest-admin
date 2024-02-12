import { useEffect, useMemo, useState } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import Chart from "react-apexcharts";
import { useSearchParams } from "react-router-dom";
type Props = {
  data: object;
};

const ProductSummary = ({ data }: Props) => {
  const [sales, setSales] = useState<number[]>([]);
  const [searchParams]: any = useSearchParams();
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
                categories: Object.keys(data),
              },
              theme: {
                mode: searchParams.get("theme"),
              },
            }}
            series={[
              {
                name: "chart-1",
                data: sales,
              },
            ]}
            type="bar"
            height={190}
          />
        </div>
      </div>
    );
  }, [sales, searchParams.get("theme")]);
  return <Card body={renderBody} style={{ flex: 4 }} />;
};

export default ProductSummary;
