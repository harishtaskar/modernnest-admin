import { useCallback, useMemo } from "react";
import Table from "../../HOC/table/Table";
import classes from "./index.module.css";
import { useRecoilState } from "recoil";
// @ts-ignore
import { filterCheckedState } from "./state/index";
import OtherActions from "./OtherActions";

type Props = {};

const Products = (props: Props) => {
  const [filterCheckedList, setFilterCheckedList] =
    useRecoilState<string[]>(filterCheckedState);

  const onFilterChecked = useCallback(
    (e: any) => {
      const filter = e.target.value;
      if (!filterCheckedList?.includes(filter)) {
        setFilterCheckedList((prev) => [...prev, filter]);
      } else {
        setFilterCheckedList(
          filterCheckedList.filter((item) => {
            return item !== filter;
          })
        );
      }
    },
    [filterCheckedList]
  );

  console.log(filterCheckedList);

  return (
    <div className={classes.screen}>
      <Table
        rows={[
          ["data", "data", "data", "data", "data"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
          ["data1", "data1", "data1", "data1", "data1"],
        ]}
        headers={["header", "header", "header", "header", "header"]}
        searchOnChange={() => {}}
        searchEnable={true}
        filterEnable={true}
        filterList={["A-Z", "Z-A", "Pending"]}
        filterChecked={onFilterChecked}
        checkedFilterList={filterCheckedList}
        filterResetHandler={() => setFilterCheckedList([])}
        otherActions={<OtherActions />}
      />
    </div>
  );
};

export default Products;
