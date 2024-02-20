import { useEffect, useMemo, useState } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import Chart from "react-apexcharts";
import SelectBox from "../../../HOC/SelectBox";
import { useRecoilValue } from "recoil";
// @ts-ignore
import { darkmodeState } from "./../../../../state/atoms/screen";

type Props = {
  data: Object;
};

const CategoryWiseSales = ({ data }: Props) => {
  const [month, setMonth] = useState("Jan");
  const [category, setCategory] = useState({});
  const darkmode = useRecoilValue(darkmodeState);

  useEffect(() => {
    setCategory(
      Object.entries(data).filter((item) => item[0] === month)[0][1]?.category
    );
  }, [month]);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <div className={classes.header}>
          <div>
            <span className="subheading">Categories</span>
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
              chart: {
                width: 380,
                type: "pie",
                background: "var(--white)",
              },
              theme: {
                //@ts-ignore
                mode: darkmode ? "dark" : "light",
              },
              labels: Object.keys(category),
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            }}
            //@ts-ignore
            series={Object.values(category)}
            type="pie"
            height={240}
          />
        </div>
      </div>
    );
  }, [month, category, darkmode]);
  return (
    <Card
      body={renderBody}
      style={{
        flex: 3,
        height: `${outerHeight || "100%"}`,
        minHeight: "200px",
      }}
    />
  );
};

export default CategoryWiseSales;
