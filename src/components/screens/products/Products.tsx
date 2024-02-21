import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../../HOC/table/Table";
import classes from "./index.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
// @ts-ignore
import { filterCheckedState } from "./state/index";
// @ts-ignore
import { productState } from "./state/index";
// @ts-ignore
import { recallProductsAPI } from "../../../state/atoms/screen.js";
import OtherActions from "./OtherActions";
import useAPI from "../../../hooks/Other/useAPI";
import { PORT } from "../../../../config";
import ProductActions from "./components/ProductActions";
import MoreActions from "./components/MoreActions";

type Props = {};

const Products = (props: Props) => {
  const [filterCheckedList, setFilterCheckedList] =
    useRecoilState<string[]>(filterCheckedState);
  const tableHeaders: string[] = [
    "name",
    "brand",
    "category",
    "quantity",
    "price",
    "actions",
    "",
  ];
  const recallAPI = useRecoilValue(recallProductsAPI);
  const [filter, setFilter] = useState<string>("");
  const [products, setProducts] = useRecoilState<any[]>(productState);
  const { getRequest } = useAPI();

  useEffect(() => {
    const debounce = setTimeout(async () => {
      const response = await getRequest(
        `${PORT}/product/?filter=${filter}`,
        {}
      );
      setProducts(response.products);
    }, 600);
    return () => clearTimeout(debounce);
  }, [filter, recallAPI]);

  const searchHandler = useCallback((id: string, value: string) => {
    setFilter(value);
  }, []);

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

  const addRowInTable = useCallback((key: string, item: any, row: object) => {
    if (
      key === "brand" ||
      key === "name" ||
      key === "category" ||
      key === "quantity" ||
      key === "price"
    ) {
      row = { ...row, [key]: item };
    } else if (key === "__v") {
      row = {
        ...row,
        ["actions"]: <ProductActions />,
      };
    } else if (key === "_id") {
      row = {
        ...row,
        [""]: <MoreActions id={item} />,
      };
    }
    return row;
  }, []);

  const renderRows = useMemo(() => {
    let rows: object[] = [];
    products?.forEach((item) => {
      let row: object = {};
      Object.entries(item)?.forEach((item: any) => {
        row = addRowInTable(item[0], item[1], row);
      });
      rows.push(row);
    });
    return rows;
  }, [products, filter]);

  return (
    <div className={classes.screen}>
      <Table
        rows={renderRows}
        headers={tableHeaders}
        searchOnChange={searchHandler}
        searchEnable={true}
        filterEnable={true}
        filterList={["A-Z", "Z-A", "Pending"]}
        filterChecked={onFilterChecked}
        checkedFilterList={filterCheckedList}
        filterResetHandler={() => setFilterCheckedList([])}
        otherActions={<OtherActions />}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default Products;
