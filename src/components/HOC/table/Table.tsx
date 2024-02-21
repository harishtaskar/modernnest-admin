import React, { CSSProperties, ChangeEventHandler, ReactNode } from "react";
import classes from "./index.module.css";
import SearchInput from "./SearchInput";
import FilterButton from "./FilterButton";

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
}: Props) => {
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
                  <div key={index} className={classes["table-row"]}>
                    {headers?.map((header, index) => {
                      return (
                        <div
                          key={index}
                          className={classes["table-data"]}
                          style={header === "" ? { width: "20%" } : {}}
                        >
                          {row[headers[index]]}
                        </div>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <span style={{ marginTop: "40px" }}>Empty Product List</span>
            )}
          </div>
          <i className={classes["table-footer"]} />
        </div>
      </div>
    </>
  );
};

export default Table;
