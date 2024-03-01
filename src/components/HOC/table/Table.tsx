import React, {
  CSSProperties,
  ChangeEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import classes from "./index.module.css";
import SearchInput from "./SearchInput";
import FilterButton from "./FilterButton";
import SkeletonLoading from "../../shared/SkeletonLoading";

type Props = {
  rows: object[];
  headers: string[];
  searchOnChange: Function;
  searchEnable?: boolean;
  filterEnable?: boolean;
  filterChecked?: ChangeEventHandler<HTMLInputElement>;
  filterList?: string[];
  checkedFilterList?: string[];
  otherActions: ReactNode;
  filterResetHandler?: React.MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
  tableRowClicked: Function;
};

const Table = ({
  rows,
  headers,
  searchOnChange,
  searchEnable,
  filterEnable,
  filterChecked,
  filterList,
  checkedFilterList,
  filterResetHandler,
  otherActions,
  style,
  tableRowClicked,
}: Props) => {
  const [dataloading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataLoading(true);
    setTimeout(() => {
      setDataLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className={classes["top-div"]}>
        {otherActions}
        {filterEnable && (
          <FilterButton
            filterChecked={filterChecked}
            filters={filterList}
            filterCheckedList={checkedFilterList}
            onResetHandler={filterResetHandler}
          />
        )}
        {searchEnable && <SearchInput onChange={searchOnChange} />}
      </div>
      <div className={classes.table}>
        <div style={{ width: "100%" }}>
          <div className={classes["table-header"]}>
            {headers.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classes["table-head"]}
                  style={item === "" ? { width: "20%" } : {}}
                >
                  {item}
                </div>
              );
            })}
          </div>

          <div className={classes["table-body"]}>
            {rows.length ? (
              rows?.map((row: any, index) => {
                return (
                  <div className={classes["table-row"]}>
                    <div
                      key={index}
                      className={classes["table-row-inner-div"]}
                      onClick={() => tableRowClicked(row)}
                    >
                      {headers?.map((header, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              row["outofstock"] === true
                                ? `${classes["outofstock-row"]} ${classes["table-data"]}`
                                : classes["table-data"]
                            }
                            style={header === "" ? { width: "20%" } : {}}
                          >
                            {dataloading ? (
                              <SkeletonLoading
                                style={{
                                  width: "100%",
                                  margin: "6px 0px",
                                  height: "15px",
                                  display: "block",
                                  borderRadius: "8px",
                                }}
                              />
                            ) : (
                              row[headers[index]]
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <>{row["details"]}</>
                    {/* {row["outofstock"] === true && (
                      <span className={classes.outofstock}>Out of Stock</span>
                    )} */}
                  </div>
                );
              })
            ) : (
              <span style={{ marginTop: "40px" }}>No Products.</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
