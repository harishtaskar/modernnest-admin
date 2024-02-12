import { useEffect, useMemo, useState } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import Chart from "react-apexcharts";
import SelectBox from "../../../HOC/SelectBox";
import { useSearchParams } from "react-router-dom";

type Props = {
  data: Object;
};

const CategoryWiseSales = ({ data }: Props) => {
  const [month, setMonth] = useState("Jan");
  const [category, setCategory] = useState({});
  const [searchParams]: any = useSearchParams();

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
                mode: searchParams.get("theme"),
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
            height={200}
          />
        </div>
      </div>
    );
  }, [month, category, searchParams.get("theme")]);
  return (
    <Card
      body={renderBody}
      style={{
        flex: 2,
        height: `${outerHeight || "100%"}`,
        minHeight: "200px",
      }}
    />
  );
};

export default CategoryWiseSales;
