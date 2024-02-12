import { ChangeEventHandler } from "react";
import styles from "./index.module.css";

type Props = {
  options: any[];
  label?: string;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  require?: boolean;
};

const SelectBox = ({
  options,
  label,
  id,
  name,
  onChange,
  require = true,
}: Props) => {
  return (
    <div className={styles.select}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label} {require && <i style={{ color: "red" }}>*</i>}
      </label>
      <select
        name={name}
        id={id}
        className={`${styles.dropdown} ${styles.input}`}
        onChange={onChange}
      >
        {options.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBox;
