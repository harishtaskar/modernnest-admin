import {
  CSSProperties,
  ChangeEventHandler,
  TextareaHTMLAttributes,
} from "react";
import styles from "./index.module.css";
type Props = {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  id: string;
  rows?: number;
  label?: string;
  placeholder?: string;
  name?: string;
  require?: boolean;
  value?: string;
  style?: CSSProperties;
};

const TextArea = ({
  onChange,
  id,
  name,
  label,
  placeholder,
  rows,
  require = true,
  value,
  style,
}: Props) => {
  return (
    <div className={styles["text-area"]} style={style}>
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
        value={value}
      />
    </div>
  );
};

export default TextArea;
