import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import classes from "./filter.module.css";

const FilterButton = ({
  filters,
  filterChecked,
  filterCheckedList = [],
  onResetHandler,
}: {
  filters?: string[];
  filterChecked?: ChangeEventHandler<HTMLInputElement>;
  filterCheckedList?: string[];
  onResetHandler?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const divRef: any = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isSelect, setIsSelect] = useState(true);

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (!divRef.current?.contains(event.target)) {
        // change starts here
        setIsActive(false);
        // change starts here
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div className={classes.main} ref={divRef}>
      <div
        tabIndex={0}
        className={
          isActive ? `${classes.button} ${classes.border}` : `${classes.button}`
        }
        onClick={() => setIsActive((prev) => !prev)}
      >
        <i className="ri-filter-3-fill ri-xl"></i>
        Filters
      </div>
      {filterCheckedList?.length > 0 && (
        <div className={classes.badge}>{filterCheckedList?.length}</div>
      )}
      {isActive && (
        <div tabIndex={0} className={classes.filter}>
          <div className={classes.reset}>
            <span>Actions</span>
            <button onClick={onResetHandler}>Reset</button>
          </div>
          <div
            className={
              isSelect
                ? `${classes.select} ${classes.selectBorder}`
                : `${classes.select}`
            }
            onClick={() => setIsSelect((prev) => !prev)}
          >
            Select
            {isSelect ? (
              <i className="ri-arrow-down-s-line ri-xl"></i>
            ) : (
              <i className="ri-arrow-up-s-line ri-xl"></i>
            )}
          </div>
          {isSelect && (
            <ul>
              {filters?.map((item: string) => {
                return (
                  <li>
                    <input
                      type="checkbox"
                      id={item}
                      value={item}
                      name={item}
                      className={classes.checkbox}
                      onChange={filterChecked}
                      checked={filterCheckedList.includes(item)}
                    />
                    <label htmlFor={item}>{item}</label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
