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
// @ts-ignore
import { currentUserState } from "../../../state/atoms/screen.js";
import OtherActions from "./OtherActions";
import useAPI from "../../../hooks/Other/useAPI";
import { PORT } from "../../../../config";
import ProductActions from "./components/ProductActions";
import MoreActions from "./components/MoreActions";
import DetailedRow from "./components/DetailedRow.js";

type Props = {};

const Products = ({}: Props) => {
  const currentUser: any = useRecoilValue(currentUserState);
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
  const [detailedRowVisible, setDetailedRowVisible] = useState<any[]>([]);
  const { getRequest } = useAPI();

  useEffect(() => {
    const debounce = setTimeout(async () => {
      const response = await getRequest(`${PORT}/product/?filter=${filter}`, {
        _id: currentUser._id,
      });
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

  const addRowInTable = useCallback(
    (key: string, item: any, row: object, rowdetails: any) => {
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
          ["actions"]: (
            <ProductActions
              disclosed={detailedRowVisible.includes(rowdetails._id)}
            />
          ),
        };
      } else if (key === "_id") {
        row = {
          ...row,
          [""]: <MoreActions id={item} />,
          ["details"]: (
            <DetailedRow
              data={rowdetails}
              visible={detailedRowVisible.includes(rowdetails._id)}
            />
          ),
        };
      }
      return {
        ...row,
        rowdetails,
        isDetailVisible: detailedRowVisible.includes(rowdetails._id),
      };
    },
    [detailedRowVisible]
  );

  const renderRows = useMemo(() => {
    let rows: any[] = [];
    products?.forEach((rowdetails) => {
      let row: any = {};
      Object.entries(rowdetails)?.forEach((item: any) => {
        row = addRowInTable(item[0], item[1], row, rowdetails);
      });

      if (row?.quantity === 0) {
        rows.push({ ...row, outofstock: true });
      } else {
        rows.push(row);
      }
    });

    if (filterCheckedList.includes("Low - High (Price)")) {
      return rows.sort((a, b) => a.price - b.price);
    } else if (filterCheckedList.includes("High - Low (Price)")) {
      return rows.sort((a, b) => b.price - a.price);
    } else if (filterCheckedList.includes("Out of Stock")) {
      return rows.filter((row) => row.quantity === 0);
    } else if (filterCheckedList.includes("Available Products")) {
      return rows.filter((row) => row.quantity !== 0);
    } else {
      return rows;
    }
  }, [products, filter, filterCheckedList, detailedRowVisible]);

  const rowClickHandler = useCallback((data: any) => {
    setDetailedRowVisible((prev: any[]) => {
      if (prev.includes(data.rowdetails._id)) {
        return prev.filter((item) => item !== data.rowdetails._id);
      } else {
        return [...prev, data.rowdetails._id];
      }
    });
  }, []);

  return (
    <div className={classes.screen}>
      <Table
        tableRowClicked={rowClickHandler}
        rows={renderRows}
        headers={tableHeaders}
        searchOnChange={searchHandler}
        searchEnable={true}
        filterEnable={true}
        filterList={[
          "Low - High (Price)",
          "High - Low (Price)",
          "Out of Stock",
          "Available Products",
        ]}
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
