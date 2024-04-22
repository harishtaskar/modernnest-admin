import { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import classes from "./index.module.css";
import SelectBox from "../../../HOC/SelectBox";
import Card from "../../../HOC/Card";
import { useRecoilValue } from "recoil";
// @ts-ignore
import { darkmodeState } from "./../../../../state/atoms/screen";

type Props = {
  data: Object;
  months: any;
};

const MonthWiseSales = ({ data, months }: Props) => {
  const [month, setMonth] = useState<any>("Jan");
  const [sales, setSales] = useState<any>([]);
  const darkmode = useRecoilValue(darkmodeState);

  useEffect(() => {
    if (data !== undefined) {
      setSales(Object.entries(data)?.filter((item) => item[0] === month)[0]);
    }
  }, [month, data]);

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
              options={months}
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
                mode: darkmode ? "dark" : "light",
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
                data: sales[1]?.sales || "",
              },
            ]}
            type="line"
            height={220}
          />
        </div>
      </div>
    );
  }, [month, sales, darkmode]);
  return <Card body={renderBody} style={{ flex: 4 }} />;
};

export default MonthWiseSales;
