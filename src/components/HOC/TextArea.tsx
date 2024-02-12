import { ChangeEventHandler, TextareaHTMLAttributes } from "react";
import styles from "./index.module.css";
type Props = {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  id: string;
  rows?: number;
  label?: string;
  placeholder?: string;
  name?: string;
  require?: boolean;
};

const TextArea = ({
  onChange,
  id,
  name,
  label,
  placeholder,
  rows,
  require = true,
}: Props) => {
  return (
    <div className={styles["text-area"]}>
      <label htmlFor="description" className={styles.inputLabel}>
        {label} {require && <i style={{ color: "red" }}>*</i>}
      </label>
      <textarea
        onChange={onChange}
        name={name}
        id={id}
        rows={rows}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default TextArea;
