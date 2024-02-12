import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./table/filter.module.css";
import styles from "./index.module.css";

type Props = {
  checkedList: Function;
  options: any[];
  label?: string;
  id: string;
  name?: string;
  require?: boolean;
  inputLabel?: string;
};

const MultiSelectorInput = ({
  options,
  inputLabel,
  label,
  id,
  require = true,
  checkedList,
}: Props) => {
  const [checked, setChecked] = useState<any[]>([]);
  const divRef: any = useRef(null);
  const [isActive, setIsActive] = useState(false);

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

  useEffect(() => {
    checkedList(checked);
  }, [checked]);

  const selectHandler = useCallback(
    (e: any, value: string) => {
      e.preventDefault();
      e.stopPropagation();
      if (value === "all states") {
        if (checked.includes(value)) {
          setChecked([]);
        } else {
          setChecked([value]);
        }
      } else {
        if (!checked?.includes(value)) {
          setChecked((prev) => [...prev, value]);
        } else {
          setChecked(
            checked.filter((item) => {
              return item !== value;
            })
          );
        }
      }
    },
    [checked]
  );

  return (
    <div className={styles.inputText} ref={divRef}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label} {require && <i style={{ color: "red" }}>*</i>}
      </label>
      <div
        tabIndex={0}
        className={
          isActive
            ? `${styles.input} ${classes.border}`
            : `${styles.input} ${styles.multiselect}`
        }
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
      >
        {inputLabel}
      </div>
      {isActive && (
        <div tabIndex={0} className={styles.multiList}>
          <ul className={styles.ul}>
            <li
              onClick={(e: any) => selectHandler(e, "all states")}
              className={styles.li}
            >
              <input
                type="checkbox"
                id={"all states"}
                value={"all states"}
                name={"all states"}
                className={classes.checkbox}
                checked={checked.includes("all states")}
              />
              <label htmlFor={"all"} className={styles.inputLabel}>
                all
              </label>
            </li>
            {options?.map((item: string) => {
              return (
                <li
                  onClick={(e) => selectHandler(e, item)}
                  className={styles.li}
                >
                  <input
                    type="checkbox"
                    id={item}
                    value={item}
                    name={item}
                    className={classes.checkbox}
                    checked={
                      checked.includes(item) || checked.includes("all states")
                    }
                  />
                  <label htmlFor={item} className={styles.inputLabel}>
                    {item}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectorInput;
