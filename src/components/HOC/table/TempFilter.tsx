import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./filter.module.css";

const FilterButton = ({
  filters,
  filterClicked,
  filterCheckedList = [],
}: {
  filters?: string[];
  filterClicked?: MouseEventHandler<HTMLSpanElement>;
  filterCheckedList?: string[];
}) => {
  const divRef: any = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [button, setButton] = useState("");
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
        onClick={() => {
          if (button === "") {
            setIsActive((prev) => !prev);
          }
          console.log(button);
        }}
      >
        {button?.length > 0 ? button : "Filters"}
        <i
          className="ri-filter-3-fill ri-xl"
          onClick={() => setIsActive((prev) => !prev)}
        ></i>
      </div>
      {filterCheckedList?.length > 0 && (
        <div className={classes.badge}>{filterCheckedList?.length}</div>
      )}
      {isActive && (
        <div tabIndex={0} className={classes.filter}>
          <ul>
            {filters?.map((item: string) => {
              return (
                <li
                  onClick={() => {
                    setButton(item);
                    setIsActive((prev) => !prev);
                  }}
                >
                  <span id={item} className={classes.checkbox} />
                  <label htmlFor={item}>{item}</label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
