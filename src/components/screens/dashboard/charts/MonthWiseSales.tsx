import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import classes from "./index.module.css";
import SelectBox from "../../../HOC/SelectBox";
import Card from "../../../HOC/Card";
import { useSearchParams } from "react-router-dom";

type Props = {
  data: Object;
};

const MonthWiseSales = ({ data }: Props) => {
  const [month, setMonth] = useState<any>("Jan");
  const [sales, setSales] = useState<any>([]);
  const [searchParams]: any = useSearchParams();

  useEffect(() => {
    setSales(Object.entries(data).filter((item) => item[0] === month)[0]);
  }, [month]);

  console.log(sales);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <div className={classes.header}>
          <div>
            <span className="subheading">Month Wise Sales</span>
            {"  "}
            <span className="normal-text">(in Thousand)</span>
          </div>
          <div>
            <SelectBox
              options={Object.keys(data)}
              id="dates"
              name="dates"
              require={false}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.chart}>
          <Chart
            options={{
              markers: {
                strokeWidth: 1,
                strokeColors: ["#26a0fc"],
                shape: "circle",
                radius: 2,
                size: [4, 8],
              },
              theme: {
                //@ts-ignore
                mode: searchParams.get("theme"),
              },
              stroke: { width: 2 },
              chart: { id: "monthly-sales", background: "var(--white)" },
              xaxis: {
                categories: sales[1]?.sales?.map((item: any, index: number) => {
                  return index;
                }),
              },
            }}
            series={[
              {
                name: "chart-1",
                data: sales[1]?.sales,
              },
            ]}
            type="line"
            height={220}
          />
        </div>
      </div>
    );
  }, [month, sales, searchParams.get("theme")]);
  return <Card body={renderBody} style={{ flex: 4 }} />;
};

export default MonthWiseSales;